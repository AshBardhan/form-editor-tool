import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";
import {
  PatchFormStatusSchema,
  UpdateFormSchema,
} from "@/lib/schema/formSchema";
import {
  FORM_PAGE_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
  FORM_REPORT_CACHE_TAG,
} from "@/lib/queries/forms";
import { revalidateTag } from "next/cache";

function toSlug(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "untitled-form";
}

/**
 * Resolves the canonical form id for a slug so update and delete operations target the right row.
 */
async function resolveFormIdBySlug(slug: string): Promise<string> {
  const form = await prisma.form.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!form) {
    throw new NotFoundError("Form not found");
  }

  return form.id;
}

/**
 * Returns the full form payload for editing and preview flows.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const form = await prisma.form.findUnique({
      where: { slug },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

/**
 * Updates a form's content, regenerates its blocks, and invalidates cached page data.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

    const body = await request.json();
    const parsed = UpdateFormSchema.safeParse(body);
    
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { title, theme, blocks, description, slug: inputSlug } = parsed.data;

    const generatedSlug = toSlug(inputSlug?.trim() || title);

    const duplicateForm = await prisma.form.findFirst({
      where: {
        slug: generatedSlug,
        NOT: { id },
      },
    });
    if (duplicateForm) {
      throw new ValidationError("Slug already exists");
    }

    const form = await prisma.$transaction(async (tx) => {
      const existingBlocks = await tx.formBlock.findMany({
        where: { formId: id },
        select: { id: true },
      });

      const existingBlockIds = new Set(existingBlocks.map((block) => block.id));
      const retainedBlockIds = new Set<string>();

      const blocksToCreate = blocks.filter((block) => {
        if (block.id && existingBlockIds.has(block.id)) {
          retainedBlockIds.add(block.id);
          return false;
        }

        return true;
      });

      const blocksToDelete = existingBlocks
        .map((block) => block.id)
        .filter((blockId) => !retainedBlockIds.has(blockId));

      if (blocksToDelete.length > 0) {
        const usedResponseCount = await tx.formFieldResponse.count({
          where: {
            blockId: {
              in: blocksToDelete,
            },
          },
        });

        if (usedResponseCount > 0) {
          throw new ValidationError(
            "Cannot remove fields that already have submissions. Keep the existing field or clear submissions first.",
          );
        }
      }

      await tx.form.update({
        where: { id },
        data: {
          title,
          theme,
          description: description ?? null,
          slug: generatedSlug,
        },
      });

      await Promise.all(
        blocks.map((block, idx) => {
          if (!block.id || !existingBlockIds.has(block.id)) {
            return Promise.resolve();
          }

          return tx.formBlock.update({
            where: { id: block.id },
            data: {
              type: block.type,
              name: block.name,
              props: block.props as Prisma.InputJsonValue,
              order: idx,
            },
          });
        }),
      );

      await Promise.all(
        blocksToCreate.map((block, idx) => {
          const order = blocks.findIndex((candidate) => candidate === block);

          return tx.formBlock.create({
            data: {
              formId: id,
              type: block.type,
              name: block.name,
              props: block.props as Prisma.InputJsonValue,
              order: order >= 0 ? order : idx,
            },
          });
        }),
      );

      if (blocksToDelete.length > 0) {
        await tx.formBlock.deleteMany({
          where: {
            id: {
              in: blocksToDelete,
            },
          },
        });
      }

      return tx.form.findUnique({
        where: { id },
        include: {
          blocks: {
            orderBy: { order: "asc" },
          },
        },
      });
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    revalidateTag(FORM_PAGE_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

/**
 * Permanently deletes a form and clears related cached page and report data.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

    const existing = await prisma.form.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundError("Form not found");
    }

    await prisma.form.delete({ where: { id } });

    revalidateTag(FORM_PAGE_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({ success: true, data: { id } }, { status: 200 });
  });
}

/**
 * Updates the form publish status and clears cached page and report data.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

    const body = await request.json();
    const parsed = PatchFormStatusSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { status } = parsed.data;

    const existing = await prisma.form.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!existing) {
      throw new NotFoundError("Form not found");
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        status,
        publishedAt:
          status === "published" && existing.status !== "published"
            ? new Date()
            : status === "draft"
              ? null
              : undefined,
      },
      include: {
        blocks: true,
      },
    });

    revalidateTag(FORM_PAGE_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

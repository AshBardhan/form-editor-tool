import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { UpdateFormSchema } from "@/lib/schema/formSchema";
import {
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
  FORM_REPORT_CACHE_TAG,
} from "@/lib/queries/forms";
import { revalidateTag } from "next/cache";
import { generateFormSlug } from "@/lib/utils/formUtils";

/**
 * Returns the full form payload for editing and preview flows.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const form = await prisma.form.findUnique({
      where: { id },
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
 * Updates a form's content and/or metadata.
 * Edit permissions enforced based on actual database status and submission count.
 */
export async function PATCH (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = UpdateFormSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { title, theme, description, slug, blocks } = parsed.data;

    // Fetch complete current form including blocks for comparison
    const currentForm = await prisma.form.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
        _count: { select: { submissions: true } },
      },
    });

    if (!currentForm) {
      throw new NotFoundError("Form not found");
    }

    // 1. Validate status permissions (security: use database state)
    const actualStatus = currentForm.status;
    const actualSubmissionsCount = currentForm._count.submissions;

    // Archived forms cannot be edited
    if (actualStatus === "archived") {
      throw new ValidationError(
        "Cannot edit archived form. Restore it to 'published' state first.",
      );
    }

    // For published forms with submissions, block updates are forbidden
    if (actualStatus === "published" && actualSubmissionsCount > 0) {
      throw new ValidationError(
        `You are not allowed to update a 'published' form with submissions. Clear the report first.`,
      );
    }

    // 2. Validate slug conflicts
    const generatedSlug = slug
      ? generateFormSlug(slug.trim())
      : title
        ? generateFormSlug(title)
        : currentForm.slug;

    if (generatedSlug !== currentForm.slug) {
      const duplicateForm = await prisma.form.findFirst({
        where: {
          slug: generatedSlug,
          NOT: { id },
        },
      });

      if (duplicateForm) {
        throw new ValidationError("Slug already exists");
      }
    }

    const form = await prisma.$transaction(async (tx) => {
      // 3. Update metadata
      const updatedFormMetadata: Prisma.FormUpdateInput = {
        title: title ?? currentForm.title,
        theme: theme ?? currentForm.theme,
        description: description ?? currentForm.description ?? null,
        slug: generatedSlug ?? currentForm.slug,
      };

      await tx.form.update({
        where: { id },
        data: updatedFormMetadata,
      });

      // 4. Process blocks if provided
      if (blocks) {
        const existingBlocksMap = new Map(
          currentForm.blocks.map((block) => [block.id, block]),
        );
        const incomingBlockIds = new Set(
          blocks.filter((b) => b.id).map((b) => b.id!),
        );

        // Determine blocks to add, update and delete
        const blocksToAdd = blocks.filter((block) => !block.id);
        const blocksToUpdate = blocks.filter(
          (block) => block.id && existingBlocksMap.has(block.id),
        );
        const blocksToDelete = currentForm.blocks
          .filter((block) => !incomingBlockIds.has(block.id))
          .map((block) => block.id);

        // Validate: cannot delete blocks that have field responses
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

        // Add new blocks
        if (blocksToAdd.length > 0) {
          await Promise.all(
            blocksToAdd.map((block) => {
              const order = blocks.findIndex((b) => b === block);
              return tx.formBlock.create({
                data: {
                  formId: id,
                  type: block.type,
                  name: block.name,
                  props: block.props as Prisma.InputJsonValue,
                  order: order >= 0 ? order : 0,
                },
              });
            }),
          );
        }

        // Update existing blocks
        if (blocksToUpdate.length > 0) {
          await Promise.all(
            blocksToUpdate.map((block) => {
              const order = blocks.findIndex((b) => b.id === block.id);
              return tx.formBlock.update({
                where: { id: block.id! },
                data: {
                  type: block.type,
                  name: block.name,
                  props: block.props as Prisma.InputJsonValue,
                  order: order >= 0 ? order : 0,
                },
              });
            }),
          );
        }

        // Delete removed blocks
        if (blocksToDelete.length > 0) {
          await tx.formBlock.deleteMany({
            where: {
              id: {
                in: blocksToDelete,
              },
            },
          });
        }
      }

      // Return the updated form with blocks
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

    revalidateTag(FORM_BUILDER_CACHE_TAG);
    revalidateTag(FORM_META_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

/**
 * Permanently deletes a form and clears related cached page and report data.
 * Frontend should show warnings for published/archived forms with submissions.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    // Get form details before deletion (for response info)
    const form = await prisma.form.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    // Delete the form (cascade deletes blocks, submissions and responses)
    await prisma.form.delete({ where: { id } });

    revalidateTag(FORM_BUILDER_CACHE_TAG);
    revalidateTag(FORM_META_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: form.id,
          title: form.title,
          status: form.status,
          deletedSubmissions: form._count.submissions,
        },
      },
      { status: 200 },
    );
  });
}

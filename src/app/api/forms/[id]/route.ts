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
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
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
 * Updates a form's content, regenerates its blocks, and invalidates cached page data.
 * Edit permissions enforced based on form status and submission count.
 */
export async function PUT(
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

    const {
      title,
      theme,
      description,
      slug: inputSlug,
      status,
      blocks,
    } = parsed.data;

    const generatedSlug = toSlug(inputSlug?.trim() || title);

    // Validate edit permissions based on status and submissions

    // Archived forms cannot be edited
    if (status === "archived") {
      throw new ValidationError(
        "Cannot edit archived form. Restore it to 'published' first.",
      );
    }

    // For published forms, check if they have submissions
    if (status === "published") {
      const submissionCount = await prisma.formSubmission.count({
        where: { formId: id },
      });

      if (submissionCount > 0) {
        throw new ValidationError(
          `Cannot update form structure - it has ${submissionCount} submission${submissionCount > 1 ? "s" : ""}. ` +
            "Only metadata updates are allowed for forms with submissions.",
        );
      }
    }

    // Check for slug conflicts
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

    // Delete the form (cascade deletes blocks, submissions, and responses)
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

/**
 * Updates the form status with proper state transition validation.
 * Enforces the 3-state lifecycle: draft → published ↔ archived
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = PatchFormStatusSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { status: newStatus } = parsed.data;

    // Get current form status to validate transition
    const currentForm = await prisma.form.findUnique({
      where: { id },
      select: { status: true, publishedAt: true },
    });

    if (!currentForm) {
      throw new NotFoundError("Form not found");
    }

    const currentStatus = currentForm.status;

    // Validate state transitions
    const invalidTransitions = [
      { from: "published", to: "draft" },
      { from: "archived", to: "draft" },
    ];

    const isInvalidTransition = invalidTransitions.some(
      (transition) =>
        currentStatus === transition.from && newStatus === transition.to,
    );

    if (isInvalidTransition) {
      throw new ValidationError(
        `Cannot transition from ${currentStatus} to ${newStatus}. ` +
          (currentStatus === "published"
            ? "Use 'archived' to unpublish a form."
            : "Restore to 'published' first, then edit."),
      );
    }

    // Determine publishedAt value based on transition
    let publishedAt: Date | null | undefined = undefined;

    if (newStatus === "published" && currentStatus === "draft") {
      // First time publishing - set publishedAt
      publishedAt = new Date();
    } else if (newStatus === "published" && currentStatus === "archived") {
      // Restoring from archive - keep original publishedAt
      publishedAt = currentForm.publishedAt;
    } else if (newStatus === "archived") {
      // Archiving - keep original publishedAt
      publishedAt = currentForm.publishedAt;
    } else if (newStatus === "draft") {
      // Back to draft - clear publishedAt
      publishedAt = null;
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        status: newStatus,
        ...(publishedAt !== undefined && { publishedAt }),
      },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        publishedAt: true,
      },
    });

    revalidateTag(FORM_BUILDER_CACHE_TAG);
    revalidateTag(FORM_META_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

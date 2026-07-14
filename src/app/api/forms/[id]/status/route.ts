import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { PatchFormStatusSchema } from "@/lib/schema/formSchema";
import {
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
  FORM_REPORT_CACHE_TAG,
} from "@/lib/queries/forms";
import { revalidateTag } from "next/cache";
import { requireAuthSession, requireOwnership } from "@/lib/utils/authUtils";

/**
 * Updates the form status with proper state transition validation.
 * Enforces the 3-state lifecycle: draft → published ↔ archived
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const session = await requireAuthSession();
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
      select: { status: true, publishedAt: true, userId: true },
    });

    if (!currentForm) {
      throw new NotFoundError("Form not found");
    }

    // Check ownership (admin can access any form)
    await requireOwnership(session, currentForm.userId);

    const currentStatus = currentForm.status;

    // No-op if status unchanged
    if (currentStatus === newStatus) {
      return NextResponse.json(
        {
          success: true,
          data: {
            id,
            status: currentStatus,
            publishedAt: currentForm.publishedAt,
            message: "Status unchanged",
          },
        },
        { status: 200 },
      );
    }

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

    let publishedAt: Date | null = null;

    switch (newStatus) {
      case "published":
        publishedAt = new Date();
        break;
      case "archived":
        publishedAt = currentForm.publishedAt;
        break;
      default:
        publishedAt = null;
        break;
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
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

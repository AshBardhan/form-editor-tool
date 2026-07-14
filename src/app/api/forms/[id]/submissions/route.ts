import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import {
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
  FORM_REPORT_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
} from "@/lib/queries/forms";
import { requireAuthSession, requireOwnership } from "@/lib/utils/authUtils";

const SubmissionSchema = z.object({
  responses: z.array(
    z.object({
      blockId: z.string().min(1, "Block ID is required"),
      value: z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.string()),
        z.null(),
      ]),
    }),
  ),
});

/**
 * POST /api/forms/[id]/submissions
 * Creates a new submission for the specified form
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id: formId } = await params;
    if (!formId) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = SubmissionSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { responses } = parsed.data;

    // Verify form exists and is published
    const form = await prisma.form.findFirst({
      where: { id: formId, status: "published" },
      select: {
        id: true,
        blocks: {
          select: { id: true },
        },
      },
    });

    if (!form) {
      throw new NotFoundError("Form not found or not published");
    }

    // Validate that all blockIds belong to this form
    const validBlockIds = new Set(form.blocks.map((b) => b.id));
    const invalidBlocks = responses.filter(
      (r) => !validBlockIds.has(r.blockId),
    );

    if (invalidBlocks.length > 0) {
      throw new ValidationError("Invalid block IDs in submission");
    }

    // Create submission with responses
    const submission = await prisma.formSubmission.create({
      data: {
        formId,
        responses: {
          create: responses.map((response) => ({
            blockId: response.blockId,
            value: response.value as Prisma.InputJsonValue,
          })),
        },
      },
      include: {
        responses: true,
      },
    });

    revalidateTag(FORM_BUILDER_CACHE_TAG);
    revalidateTag(FORM_META_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json(
      {
        success: true,
        data: {
          submissionId: submission.id,
          submittedAt: submission.submittedAt,
        },
      },
      { status: 201 },
    );
  });
}

/**
 * DELETE /api/forms/[id]/submissions
 * Clears all submissions and field responses for the specified form
 * Also resets submission-related analytics counters (starts, completions, submitAttempts)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const session = await requireAuthSession();
    const { id: formId } = await params;
    if (!formId) {
      throw new ValidationError("Form ID is required");
    }

    // Verify form exists
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        id: true,
        userId: true,
        _count: {
          select: { submissions: true },
        },
      },
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    // Check ownership (admin can access any form)
    await requireOwnership(session, form.userId);

    const submissionCount = form._count.submissions;

    // Delete all submissions (cascade will delete field responses)
    // and reset submission-related analytics counters
    await prisma.$transaction([
      prisma.formSubmission.deleteMany({
        where: { formId },
      }),
      prisma.form.update({
        where: { id: formId },
        data: {
          views: 0,
          starts: 0,
          completions: 0,
          submitAttempts: 0,
        },
      }),
    ]);

    revalidateTag(FORM_BUILDER_CACHE_TAG);
    revalidateTag(FORM_META_CACHE_TAG);
    revalidateTag(FORM_REPORT_CACHE_TAG);
    revalidateTag(PUBLIC_FORM_CACHE_TAG);

    return NextResponse.json({
      success: true,
      data: {
        deletedSubmissions: submissionCount,
      },
    });
  });
}

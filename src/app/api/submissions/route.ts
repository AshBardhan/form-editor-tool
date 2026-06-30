import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { FORM_REPORT_CACHE_TAG } from "@/lib/queries/forms";

const SubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
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
 * Validates and stores a new form submission, then invalidates the report cache.
 */
export async function POST(request: NextRequest) {
  return apiHandler(async () => {
    const body = await request.json();
    const parsed = SubmissionSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { formId, responses } = parsed.data;

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

    revalidateTag(FORM_REPORT_CACHE_TAG);

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

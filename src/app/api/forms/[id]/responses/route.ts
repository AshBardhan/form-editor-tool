import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;

    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    // Verify form exists
    const form = await prisma.form.findUnique({
      where: { id },
      select: { id: true, title: true },
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    // Fetch all submissions for this form
    const submissions = await prisma.formSubmission.findMany({
      where: { formId: id },
      include: {
        responses: {
          include: {
            block: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          form: {
            id: form.id,
            title: form.title,
          },
          submissions: submissions.map((submission) => ({
            id: submission.id,
            submittedAt: submission.submittedAt,
            responses: submission.responses.map((response) => ({
              id: response.id,
              blockId: response.blockId,
              blockType: response.block.type,
              blockName: response.block.name,
              blockProps: response.block.props,
              value: response.value,
            })),
          })),
          totalSubmissions: submissions.length,
        },
      },
      { status: 200 },
    );
  });
}

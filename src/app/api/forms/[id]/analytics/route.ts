import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { revalidateFormAnalyticsCache } from "@/lib/cache/formCache";

const AnalyticsEventSchema = z.object({
  event: z.enum(["view", "start", "completion", "submit_attempt"]),
});

type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>["event"];

function toIncrementData(event: AnalyticsEvent) {
  switch (event) {
    case "view":
      return { views: { increment: 1 } };
    case "start":
      return { starts: { increment: 1 } };
    case "completion":
      return { completions: { increment: 1 } };
    case "submit_attempt":
      return { submitAttempts: { increment: 1 } };
    default:
      return null;
  }
}

/**
 * Increments one analytics counter for a published form identified by ID.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = AnalyticsEventSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const data = toIncrementData(parsed.data.event);
    if (!data) {
      throw new ValidationError("Unsupported analytics event");
    }

    const result = await prisma.form.updateMany({
      where: {
        id,
        status: "published",
      },
      data,
    });

    if (result.count === 0) {
      throw new NotFoundError("Form not found or not published");
    }

    revalidateFormAnalyticsCache();

    return NextResponse.json({ success: true }, { status: 200 });
  });
}

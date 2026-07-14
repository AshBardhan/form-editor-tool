/**
 * Admin Forms API
 * List all forms across all users
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { requireAuthSession, requireAdmin } from "@/lib/utils/authUtils";
import { ValidationError } from "@/lib/errors";
import { FormStatus } from "@/lib/types/form";

export async function GET(request: NextRequest) {
  return apiHandler(async () => {
    const session = await requireAuthSession();
    await requireAdmin(session);

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as FormStatus;
    const userId = parseInt(searchParams.get("userId") || "");

    if (!userId || isNaN(userId)) {
      throw new ValidationError("Invalid user ID");
    }

    if (!status || !["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
      throw new ValidationError("Invalid status");
    }

    const where = {
      status,
      userId,
    };

    const forms = await prisma.form.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        views: true,
        starts: true,
        completions: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            blocks: true,
            submissions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: forms });
  });
}

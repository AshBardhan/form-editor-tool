/**
 * Admin Forms API
 * List all forms across all users
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { requireAdmin } from "@/lib/utils/authUtils";

export async function GET(request: NextRequest) {
  return apiHandler(async () => {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    const where: any = {};
    if (status) where.status = status;
    if (userId) where.userId = parseInt(userId);

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

/**
 * Admin Users API
 * List all users with their stats
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { requireAdmin } from "@/lib/utils/authUtils";

export async function GET() {
  return apiHandler(async () => {
    await requireAdmin();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        _count: {
          select: {
            forms: true,
            sessions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: users });
  });
}

/**
 * Admin Analytics API
 * Platform-wide statistics
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { requireAuthSession, requireAdmin } from "@/lib/utils/authUtils";

export async function GET() {
  return apiHandler(async () => {
    const session = await requireAuthSession();
    await requireAdmin(session);

    const [
      totalUsers,
      totalForms,
      totalSubmissions,
      publishedForms,
      clientCount,
      adminCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.form.count(),
      prisma.formSubmission.count(),
      prisma.form.count({ where: { status: "published" } }),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);

    // Get recent activity
    const recentForms = await prisma.form.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const recentSubmissions = await prisma.formSubmission.findMany({
      take: 5,
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        submittedAt: true,
        form: {
          select: {
            title: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalForms,
          totalSubmissions,
          publishedForms,
          clientCount,
          adminCount,
        },
        recentActivity: {
          forms: recentForms,
          submissions: recentSubmissions,
        },
      },
    });
  });
}

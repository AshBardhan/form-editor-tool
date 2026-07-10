/**
 * Admin User Management API
 * Update or delete specific user
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { requireAdmin } from "@/lib/utils/authUtils";
import { ValidationError, NotFoundError } from "@/lib/errors";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    await requireAdmin();

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new ValidationError("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Delete user (cascade deletes forms, sessions, accounts)
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    await requireAdmin();

    const { id } = await params;
    const userId = parseInt(id);
    const body = await request.json();

    if (isNaN(userId)) {
      throw new ValidationError("Invalid user ID");
    }

    const { role } = body;

    if (!role || !["CLIENT", "ADMIN"].includes(role)) {
      throw new ValidationError("Invalid role");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "User role updated successfully",
    });
  });
}

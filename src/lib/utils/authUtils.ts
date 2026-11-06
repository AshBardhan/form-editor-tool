/**
 * Authentication Utilities
 * Helper functions for authentication and authorization checks
 */

import { auth } from "@/auth";
import type { Session } from "next-auth";
import type { UserRole } from "@prisma/client";
import type { Permission } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";

/**
 * Get authenticated user session or throw unauthorized error
 * Call this once at the start of API routes/server components
 * Pass the returned session to other auth functions
 */
export async function requireAuthSession(): Promise<Session> {
  const session = await auth();

  if (!session || !session.user) {
    throw new UnauthorizedError("Please sign in to continue");
  }

  return session;
}

/**
 * Require specific role
 * Throws ForbiddenError if user doesn't have the role
 */
export function requireRole(session: Session, role: UserRole): void {
  if (session.user.role !== role) {
    throw new ForbiddenError(`This action requires ${role} privileges`);
  }
}

/**
 * Require admin role
 * Throws ForbiddenError if user is not an ADMIN
 */
export function requireAdmin(session: Session): void {
  requireRole(session, "ADMIN");
}

/**
 * Require specific permission
 * Throws ForbiddenError if user doesn't have the permission
 */
export function requirePermission(
  session: Session,
  permission: Permission,
): void {
  if (!hasPermission(session.user.role, permission)) {
    throw new ForbiddenError(
      "You do not have permission to perform this action",
    );
  }
}

/**
 * Check if user owns a resource or is admin
 * Throws ForbiddenError if neither condition is met
 */
export function requireOwnership(
  session: Session,
  resourceUserId: number,
): void {
  const currentUserId = parseInt(session.user.id);

  if (currentUserId !== resourceUserId && session.user.role !== "ADMIN") {
    throw new ForbiddenError("You do not have access to this resource");
  }
}

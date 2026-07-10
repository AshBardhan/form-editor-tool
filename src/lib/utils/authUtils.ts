/**
 * Authentication Utilities
 * Helper functions for authentication and authorization checks
 */

import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";
import type { Permission } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";

/**
 * Get current session or throw unauthorized error
 * Use this in API routes that require authentication
 */
export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new UnauthorizedError("Authentication required");
  }

  return session;
}

/**
 * Require specific role
 * Throws ForbiddenError if user doesn't have the role
 */
export async function requireRole(role: UserRole) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    throw new ForbiddenError(`${role} role required`);
  }

  return session;
}

/**
 * Require admin role
 * Convenience function for requiring ADMIN role
 */
export async function requireAdmin() {
  return requireRole("ADMIN");
}

/**
 * Require specific permission
 * Throws ForbiddenError if user doesn't have the permission
 */
export async function requirePermission(permission: Permission) {
  const session = await requireAuth();

  if (!hasPermission(session.user.role, permission)) {
    throw new ForbiddenError("Insufficient permissions");
  }

  return session;
}

/**
 * Check if user owns a resource or is admin
 * Throws ForbiddenError if neither condition is met
 */
export async function requireOwnership(resourceUserId: number) {
  const session = await requireAuth();
  const currentUserId = parseInt(session.user.id);

  if (currentUserId !== resourceUserId && session.user.role !== "ADMIN") {
    throw new ForbiddenError("Access denied");
  }

  return session;
}

/**
 * Check if user can access resource (either owner or has permission)
 * More flexible than requireOwnership for cases with granular permissions
 */
export async function requireResourceAccess(
  resourceUserId: number,
  permission: Permission,
) {
  const session = await requireAuth();
  const currentUserId = parseInt(session.user.id);

  // Owner always has access
  if (currentUserId === resourceUserId) {
    return session;
  }

  // Check if user has permission for all resources
  if (!hasPermission(session.user.role, permission)) {
    throw new ForbiddenError("Access denied");
  }

  return session;
}

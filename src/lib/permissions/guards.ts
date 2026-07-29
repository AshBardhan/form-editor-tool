/**
 * Permission Guard Functions
 * Helper functions to check if a user has specific permissions
 */

import type { UserRole } from "@prisma/client";
import type { Permission } from "./definitions";
import { ROLE_PERMISSIONS } from "./roles";

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Check if a role has ANY of the provided permissions
 */
export function hasAnyPermission(
  role: UserRole,
  permissions: Permission[],
): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

/**
 * Check if a role has ALL of the provided permissions
 */
export function hasAllPermissions(
  role: UserRole,
  permissions: Permission[],
): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if user is owner of a resource
 */
export function isOwner(userId: number, resourceUserId: number): boolean {
  return userId === resourceUserId;
}

/**
 * Check if user can access a resource (either owner or admin)
 */
export function canAccessResource(
  userId: number,
  userRole: UserRole,
  resourceUserId: number,
): boolean {
  return isOwner(userId, resourceUserId) || userRole === "ADMIN";
}

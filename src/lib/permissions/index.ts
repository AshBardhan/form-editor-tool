/**
 * Permission System
 * Exports all permission-related functionality
 */

export { PERMISSIONS } from "./definitions";
export type { Permission } from "./definitions";
export { ROLE_PERMISSIONS } from "./roles";
export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isOwner,
  canAccessResource,
} from "./guards";

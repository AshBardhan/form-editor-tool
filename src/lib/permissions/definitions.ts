/**
 * Permission Definitions
 * Defines all available permissions in the system
 */

export const PERMISSIONS = {
  // Form permissions
  FORM_CREATE: "form:create",
  FORM_READ_OWN: "form:read:own",
  FORM_READ_ALL: "form:read:all",
  FORM_UPDATE_OWN: "form:update:own",
  FORM_UPDATE_ALL: "form:update:all",
  FORM_DELETE_OWN: "form:delete:own",
  FORM_DELETE_ALL: "form:delete:all",
  FORM_PUBLISH_OWN: "form:publish:own",
  FORM_PUBLISH_ALL: "form:publish:all",

  // Submission permissions
  SUBMISSION_READ_OWN: "submission:read:own",
  SUBMISSION_READ_ALL: "submission:read:all",
  SUBMISSION_EXPORT_OWN: "submission:export:own",
  SUBMISSION_EXPORT_ALL: "submission:export:all",
  SUBMISSION_DELETE_OWN: "submission:delete:own",
  SUBMISSION_DELETE_ALL: "submission:delete:all",

  // Analytics permissions
  ANALYTICS_READ_OWN: "analytics:read:own",
  ANALYTICS_READ_ALL: "analytics:read:all",
  ANALYTICS_READ_PLATFORM: "analytics:read:platform",
  ANALYTICS_EXPORT_OWN: "analytics:export:own",
  ANALYTICS_EXPORT_ALL: "analytics:export:all",

  // User management permissions
  USER_READ: "user:read",
  USER_READ_DETAILS: "user:read:details",
  USER_UPDATE_OWN: "user:update:own",
  USER_UPDATE_ALL: "user:update:all",
  USER_DELETE_OWN: "user:delete:own",
  USER_DELETE_ALL: "user:delete:all",
  USER_CHANGE_ROLE: "user:change:role",
  USER_IMPERSONATE: "user:impersonate",
  USER_VIEW_ACTIVITY: "user:view:activity",

  // System permissions
  SYSTEM_ACCESS_ADMIN: "system:access:admin",
  SYSTEM_VIEW_LOGS: "system:view:logs",
  SYSTEM_VIEW_METRICS: "system:view:metrics",
  SYSTEM_CONFIGURE: "system:configure",
  SYSTEM_MANAGE_INTEGRATIONS: "system:manage:integrations",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

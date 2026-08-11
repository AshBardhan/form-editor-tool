/**
 * Route Constants
 * Defines public, protected, and admin routes for authentication middleware
 */

export const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/error",
  "/forbidden",
  "/f/", // Public form submission routes
] as const;

export const ADMIN_ROUTES = ["/admin", "/api/admin"] as const;

export const PROTECTED_ROUTES = ["/forms", "/api/forms"] as const;

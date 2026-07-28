/**
 * Next.js Middleware
 * Handles authentication and authorization for protected routes
 */

/// <reference types="./types/next-auth" />

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  PROTECTED_ROUTES,
} from "./lib/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session and compute authentication states
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isAdmin = isLoggedIn && session?.user?.role === "ADMIN";

  // Compute route types
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Public routes - allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Admin routes - require ADMIN role
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // All other routes - allow access
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs", // Use Node.js runtime to support Prisma and auth
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

import { ADMIN_ROUTES, PUBLIC_ROUTES } from "@/lib/constants/routes";

export function matchesRoute(
  pathname: string,
  routes: readonly string[],
): boolean {
  return routes.some((route) => {
    // When the route is the root path, we need to check if the pathname is exactly the same.
    if (route === "/") {
      return pathname === "/";
    }

    const normalizedRoute = route.endsWith("/") ? route.slice(0, -1) : route;

    return (
      pathname === normalizedRoute || pathname.startsWith(`${normalizedRoute}/`)
    );
  });
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Landing is always public; skip auth redirects
  if (pathname === "/") {
    return NextResponse.next();
  }

  const session = req.auth;
  // Require session.user to be present — a bare session object (stale JWT) is not sufficient.
  const isAuthenticated = !!session?.user;
  const isAdmin = isAuthenticated && session?.user?.role === "ADMIN";

  const isPublicRoute = matchesRoute(pathname, PUBLIC_ROUTES);
  const isAdminRoute = matchesRoute(pathname, ADMIN_ROUTES);

  // Prevent authenticated users from accessing auth pages.
  if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/forms", req.url));
  }

  // Default-deny: redirect unauthenticated users from all non-public routes.
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Block non-admin users from admin routes.
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

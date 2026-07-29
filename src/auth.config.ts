/**
 * Edge-compatible Auth.js configuration.
 * Must NOT import anything that requires Node.js-only modules (prisma, pg,
 * bcryptjs, etc.) — this file is bundled into the Edge Runtime for middleware.
 */

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Node.js-only providers are added in auth.ts

  callbacks: {
    /**
     * Map JWT claims → session so that `req.auth.user.id` / `.role` work in
     * middleware route guards.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as typeof session.user.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  trustHost: true,

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

/**
 * Auth.js Configuration (Node.js runtime only)
 * Extends the edge-safe authConfig with the Prisma adapter and
 * CredentialsProvider that rely on Node.js-only modules (pg, bcryptjs).
 * https://authjs.dev/getting-started/installation?framework=next.js
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import type { UserRole } from "@prisma/client";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * JWT callback - runs when JWT is created or updated.
     * Adds custom fields to the token on sign-in; on session update only
     * safe profile fields are allowed to prevent privilege escalation.
     */
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id as string;
        token.role = user.role as UserRole;
      }

      // Session update — only allow safe, non-privileged profile fields.
      // Never let a client-supplied session payload overwrite id, role, or
      // other security-sensitive token claims.
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name;
        if (session.email !== undefined) token.email = session.email;
        if (session.image !== undefined) token.picture = session.image;
      }

      return token;
    },

    /**
     * Session callback - runs whenever session is checked.
     * Adds custom fields from JWT to session.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});

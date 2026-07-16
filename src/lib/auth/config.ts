/**
 * NextAuth.js Configuration
 * Handles authentication providers, callbacks, and session management
 */

import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

export const authConfig: NextAuthConfig = {
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
     * JWT callback - runs when JWT is created or updated
     * Adds custom fields to the token
     */
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role as UserRole;
      }

      // Session update
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    /**
     * Session callback - runs whenever session is checked
     * Adds custom fields from JWT to session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
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

  secret: process.env.NEXTAUTH_SECRET,
};

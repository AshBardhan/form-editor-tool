/**
 * TypeScript type definitions for NextAuth.js
 * Extends the default session and user types with our custom fields
 */

import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extended session interface with custom user fields
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  /**
   * Extended user interface with role
   */
  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extended JWT interface with custom fields
   */
  interface JWT {
    id: string;
    role: UserRole;
  }
}

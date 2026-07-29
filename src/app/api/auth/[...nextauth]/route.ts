/**
 * NextAuth.js API Route Handler
 * Handles all authentication requests: signin, signout, callbacks, etc.
 */

import { handlers } from "@/auth";

export const { GET, POST } = handlers;

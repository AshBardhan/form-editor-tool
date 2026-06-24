import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

// Check if API mocking is enabled
const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

let prisma: PrismaClient;

if (isMockingEnabled) {
  // Use mock Prisma client for offline development
  console.log("[Prisma] Using Mock Prisma Client (no database connection)");
  // Dynamic import to avoid bundling mock in production
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { mockPrisma } = require("@/mocks/mockPrisma");
  prisma = mockPrisma as PrismaClient;
} else {
  // Use real Prisma client with database connection
  console.log("[Prisma] Using Real Prisma Client");

  // Create connection pool
  const pool =
    globalForPrisma.pool ||
    new Pool({
      connectionString: process.env.DATABASE_URL,
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

  // Create adapter
  const adapter = new PrismaPg(pool);

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      adapter,
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
}

export default prisma;

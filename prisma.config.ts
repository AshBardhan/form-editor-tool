import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Use dummy URL if mocking is enabled (no real DB needed)
const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";
const databaseUrl = isMockingEnabled
  ? "postgresql://mock:mock@localhost:5432/mock"
  : env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed/index.ts`,
  },
  datasource: {
    url: databaseUrl,
  },
});

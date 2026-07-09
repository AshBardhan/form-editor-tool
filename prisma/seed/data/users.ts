/**
 * Seed users - Default users for testing
 * Note: Passwords will be hashed during seeding with bcryptjs (cost factor: 12)
 * 
 * Test Credentials:
 * - Admin: admin@formkit.dev / admin123
 * - Client: client@formkit.dev / client123
 */
export const seedUsers = [
  {
    email: "admin@formkit.dev",
    name: "FormKit Admin",
    role: "ADMIN" as const,
    password: "admin123",
  },
  {
    email: "client@formkit.dev",
    name: "Test Client",
    role: "CLIENT" as const,
    password: "client123",
  },
];

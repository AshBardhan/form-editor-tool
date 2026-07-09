/**
 * Seed users - Default users for testing
 * Note: Passwords are pre-hashed with bcryptjs (cost factor: 12)
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
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5HBjVj6OM8WXK", // admin123
  },
  {
    email: "client@formkit.dev",
    name: "Test Client",
    role: "CLIENT" as const,
    password: "$2a$12$K1XLHxq4p3JLvzZ.K3nXKOXF1YsZn0N5lJ5V3XVJxN8LewY5HBjV", // client123
  },
];

// Legacy export for backward compatibility (uses first user)
export const seedUser = seedUsers[0];

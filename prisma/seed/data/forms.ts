import { FormStatus } from "@prisma/client";

/**
 * Seed forms - Small, realistic dataset for database initialization
 * 5 hand-crafted forms with diverse use cases
 *
 * Note: userId will be set dynamically in seed script after user creation
 * These forms are templates - the actual userId is assigned at runtime
 *
 * Metrics are hardcoded to ensure deterministic seeding:
 * - Constraints: views >= starts >= completions, submitAttempts >= submissions
 * - Values match the number of submissions in submissions.ts
 */
export const seedForms = [
  {
    id: "seed-form-001",
    slug: "customer-satisfaction-survey",
    title: "Customer Satisfaction Survey",
    description: "Help us improve our services by sharing your feedback",
    status: "published" as FormStatus,
    theme: "light" as const,
    views: 19,
    starts: 12,
    completions: 5,
    submitAttempts: 8,
  },
  {
    id: "seed-form-002",
    slug: "employee-onboarding-form",
    title: "Employee Onboarding Form",
    description: "Welcome! Please complete this form on your first day",
    status: "published" as FormStatus,
    theme: "light" as const,
    views: 9,
    starts: 3,
    completions: 3,
    submitAttempts: 5,
  },
  {
    id: "seed-form-003",
    slug: "product-feedback",
    title: "Product Feedback",
    description: "Tell us about your experience with our product",
    status: "published" as FormStatus,
    theme: "dark" as const,
    views: 6,
    starts: 5,
    completions: 3,
    submitAttempts: 4,
  },
  {
    id: "seed-form-004",
    slug: "event-registration-draft",
    title: "Tech Conference 2026 Registration",
    description: "Register for our upcoming tech conference (Work in Progress)",
    status: "draft" as FormStatus,
    theme: "light" as const,
    views: 0,
    starts: 0,
    completions: 0,
    submitAttempts: 0,
  },
  {
    id: "seed-form-005",
    slug: "bug-report-template",
    title: "Bug Report Template",
    description: "Report issues you encounter in our application",
    status: "published" as FormStatus,
    theme: "dark" as const,
    views: 9,
    starts: 6,
    completions: 2,
    submitAttempts: 3,
  },
];

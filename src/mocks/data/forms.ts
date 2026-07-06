import { FormStatus } from "@prisma/client";

/**
 * Mock forms - 10 unique forms with edge cases for offline development
 * Covers various scenarios: standard forms, edge cases, different themes, statuses
 *
 * Metrics are hardcoded for deterministic behavior
 * - Constraints: views >= starts >= completions, submitAttempts >= submissions
 */
export const mockForms = [
  // 1. Standard customer feedback form
  {
    id: "mock-form-001",
    slug: "customer-feedback-2026",
    title: "Customer Feedback Survey",
    description: "Help us improve by sharing your experience",
    status: "published" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 245,
    starts: 156,
    completions: 18,
    submitAttempts: 20,
    createdAt: "2026-05-15T10:30:00Z",
    updatedAt: "2026-06-20T14:22:00Z",
    publishedAt: "2026-05-16T09:00:00Z",
  },

  // 2. Long form with many fields (edge case: 25+ blocks)
  {
    id: "mock-form-002",
    slug: "detailed-employee-survey",
    title: "Comprehensive Employee Satisfaction Survey",
    description: "Annual employee feedback - please complete all sections",
    status: "published" as FormStatus,
    theme: "dark" as const,
    userId: "mock-user-001",
    views: 89,
    starts: 45,
    completions: 12,
    submitAttempts: 15,
    createdAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-06-15T11:30:00Z",
    publishedAt: "2026-04-10T09:00:00Z",
  },

  // 3. Form with special characters and unicode (edge case)
  {
    id: "mock-form-003",
    slug: "international-feedback",
    title: "国际反馈表 (International Feedback)",
    description:
      "Formulaire de commentaires • Формы обратной связи • نموذج الملاحظات",
    status: "published" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 67,
    starts: 34,
    completions: 8,
    submitAttempts: 10,
    createdAt: "2026-03-20T12:00:00Z",
    updatedAt: "2026-06-18T16:45:00Z",
    publishedAt: "2026-03-22T10:00:00Z",
  },

  // 4. Empty draft form (edge case: no blocks)
  {
    id: "mock-form-004",
    slug: "untitled-form-draft",
    title: "Untitled Form",
    description: null,
    status: "draft" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 0,
    starts: 0,
    completions: 0,
    submitAttempts: 0,
    createdAt: "2026-06-23T18:30:00Z",
    updatedAt: "2026-06-23T18:30:00Z",
    publishedAt: null,
  },

  // 5. Bug report form (all field types)
  {
    id: "mock-form-005",
    slug: "bug-report-v2",
    title: "Bug Report Form",
    description: "Report issues and help us improve our platform",
    status: "published" as FormStatus,
    theme: "dark" as const,
    userId: "mock-user-001",
    views: 312,
    starts: 198,
    completions: 45,
    submitAttempts: 52,
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-06-21T10:15:00Z",
    publishedAt: "2026-01-15T08:00:00Z",
  },

  // 6. Simple contact form (minimal fields)
  {
    id: "mock-form-006",
    slug: "quick-contact",
    title: "Quick Contact Form",
    description: "Get in touch with us",
    status: "published" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 456,
    starts: 289,
    completions: 67,
    submitAttempts: 73,
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-06-19T09:30:00Z",
    publishedAt: "2026-02-02T09:00:00Z",
  },

  // 7. Event registration with sections
  {
    id: "mock-form-007",
    slug: "tech-conference-2026",
    title: "Tech Conference 2026 Registration",
    description:
      "Join us for the biggest tech conference of the year - September 15-17, 2026",
    status: "published" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 1234,
    starts: 678,
    completions: 156,
    submitAttempts: 168,
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-06-22T15:20:00Z",
    publishedAt: "2026-03-05T09:00:00Z",
  },

  // 8. Draft form with content (unpublished)
  {
    id: "mock-form-008",
    slug: "q3-performance-review-draft",
    title: "Q3 Performance Review (Draft)",
    description: "Quarterly performance evaluation form - under review",
    status: "draft" as FormStatus,
    theme: "dark" as const,
    userId: "mock-user-001",
    views: 0,
    starts: 0,
    completions: 0,
    submitAttempts: 0,
    createdAt: "2026-06-20T14:00:00Z",
    updatedAt: "2026-06-22T16:30:00Z",
    publishedAt: null,
  },

  // 9. Form with very long text (edge case) - ARCHIVED
  {
    id: "mock-form-009",
    slug: "research-study-consent",
    title:
      "Research Study Consent Form - A Comprehensive Investigation into User Experience Patterns and Behavioral Analytics in Modern Web Applications",
    description:
      "This research study aims to understand how users interact with web-based form systems, their preferences for input methods, their satisfaction with various UI/UX patterns, and their overall experience with digital form completion processes. Your participation is voluntary and all data collected will be anonymized and used solely for academic research purposes in accordance with institutional review board guidelines and data protection regulations.",
    status: "archived" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 34,
    starts: 12,
    completions: 3,
    submitAttempts: 4,
    createdAt: "2026-05-01T11:00:00Z",
    updatedAt: "2026-06-10T13:45:00Z",
    publishedAt: "2026-05-05T10:00:00Z",
  },

  // 10. Product feedback with high engagement
  {
    id: "mock-form-010",
    slug: "product-feature-request",
    title: "Product Feature Requests & Suggestions",
    description: "Share your ideas to help us build better products",
    status: "published" as FormStatus,
    theme: "dark" as const,
    userId: "mock-user-001",
    views: 2145,
    starts: 1234,
    completions: 287,
    submitAttempts: 312,
    createdAt: "2026-02-15T09:30:00Z",
    updatedAt: "2026-06-23T11:00:00Z",
    publishedAt: "2026-02-16T08:00:00Z",
  },

  // 11. Old archived form from 2025
  {
    id: "mock-form-011",
    slug: "winter-2025-survey",
    title: "Winter 2025 Customer Survey",
    description: "Archived form from last year's winter campaign",
    status: "archived" as FormStatus,
    theme: "light" as const,
    userId: "mock-user-001",
    views: 523,
    starts: 298,
    completions: 87,
    submitAttempts: 94,
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2026-01-15T16:00:00Z",
    publishedAt: "2025-12-05T09:00:00Z",
  },
];

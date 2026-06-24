import { DashboardForm } from "@/lib/types/form";

/**
 * Sample list of forms for dashboard
 * 10 forms with various statuses and metrics
 */
export const sampleFormList: DashboardForm[] = [
  {
    id: "form-001",
    slug: "customer-feedback-survey",
    title: "Customer Feedback Survey",
    status: "published",
    metrics: {
      fields: 8,
      submissions: 245,
      completion: "78.2%",
    },
  },
  {
    id: "form-002",
    slug: "job-application-form",
    title: "Job Application Form",
    status: "published",
    metrics: {
      fields: 12,
      submissions: 156,
      completion: "65.4%",
    },
  },
  {
    id: "form-003",
    slug: "event-registration",
    title: "Event Registration",
    status: "published",
    metrics: {
      fields: 6,
      submissions: 89,
      completion: "92.1%",
    },
  },
  {
    id: "form-004",
    slug: "contact-us-form",
    title: "Contact Us Form",
    status: "published",
    metrics: {
      fields: 5,
      submissions: 312,
      completion: "85.7%",
    },
  },
  {
    id: "form-005",
    slug: "newsletter-signup",
    title: "Newsletter Signup",
    status: "published",
    metrics: {
      fields: 3,
      submissions: 521,
      completion: "94.3%",
    },
  },
  {
    id: "form-006",
    slug: "product-inquiry",
    title: "Product Inquiry",
    status: "draft",
    metrics: {
      fields: 7,
      submissions: 0,
      completion: "0%",
    },
  },
  {
    id: "form-007",
    slug: "bug-report-form",
    title: "Bug Report Form",
    status: "published",
    metrics: {
      fields: 9,
      submissions: 67,
      completion: "71.6%",
    },
  },
  {
    id: "form-008",
    slug: "user-onboarding",
    title: "User Onboarding",
    status: "draft",
    metrics: {
      fields: 10,
      submissions: 0,
      completion: "0%",
    },
  },
  {
    id: "form-009",
    slug: "feedback-widget",
    title: "Feedback Widget",
    status: "published",
    metrics: {
      fields: 4,
      submissions: 198,
      completion: "88.5%",
    },
  },
  {
    id: "form-010",
    slug: "support-ticket",
    title: "Support Ticket",
    status: "published",
    metrics: {
      fields: 8,
      submissions: 134,
      completion: "76.9%",
    },
  },
];

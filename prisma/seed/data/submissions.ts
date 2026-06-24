/**
 * Seed submissions - Realistic form submissions with proper relationships
 * Each submission belongs to a specific form and contains responses matching that form's blocks
 */

export const seedSubmissions = [
  // ========================================
  // Customer Satisfaction Survey (form-001)
  // ========================================
  {
    id: "seed-sub-001",
    formId: "seed-form-001",
    respondentName: "Sarah Johnson",
    respondentEmail: "sarah.johnson@example.com",
    submittedAt: new Date("2026-06-15T10:30:00Z"),
    responses: [
      { blockName: "text-name", key: "customer_name", value: "Sarah Johnson" },
      { blockName: "email-contact", key: "email", value: "sarah.johnson@example.com" },
      { blockName: "radio-satisfaction", key: "satisfaction_rating", value: "Very Satisfied" },
      { blockName: "checkbox-improvements", key: "improvement_areas", value: ["User Experience"] },
      { blockName: "textarea-comments", key: "comments", value: "Great service! Very happy with the experience." },
    ],
  },
  {
    id: "seed-sub-002",
    formId: "seed-form-001",
    respondentName: "Michael Chen",
    respondentEmail: "m.chen@company.com",
    submittedAt: new Date("2026-06-16T14:20:00Z"),
    responses: [
      { blockName: "text-name", key: "customer_name", value: "Michael Chen" },
      { blockName: "email-contact", key: "email", value: "m.chen@company.com" },
      { blockName: "radio-satisfaction", key: "satisfaction_rating", value: "Satisfied" },
      { blockName: "checkbox-improvements", key: "improvement_areas", value: ["Response Time", "Customer Support"] },
      { blockName: "textarea-comments", key: "comments", value: "Good overall, but response time could be faster." },
    ],
  },
  {
    id: "seed-sub-003",
    formId: "seed-form-001",
    respondentName: "Emily Rodriguez",
    respondentEmail: "emily.r@email.com",
    submittedAt: new Date("2026-06-18T09:15:00Z"),
    responses: [
      { blockName: "text-name", key: "customer_name", value: "Emily Rodriguez" },
      { blockName: "email-contact", key: "email", value: "emily.r@email.com" },
      { blockName: "radio-satisfaction", key: "satisfaction_rating", value: "Neutral" },
      { blockName: "checkbox-improvements", key: "improvement_areas", value: ["Pricing", "Product Quality"] },
      { blockName: "textarea-comments", key: "comments", value: "Average experience. Some features need improvement." },
    ],
  },
  {
    id: "seed-sub-004",
    formId: "seed-form-001",
    respondentName: "James Wilson",
    respondentEmail: "jwilson@domain.com",
    submittedAt: new Date("2026-06-20T16:45:00Z"),
    responses: [
      { blockName: "text-name", key: "customer_name", value: "James Wilson" },
      { blockName: "email-contact", key: "email", value: "jwilson@domain.com" },
      { blockName: "radio-satisfaction", key: "satisfaction_rating", value: "Very Satisfied" },
      { blockName: "checkbox-improvements", key: "improvement_areas", value: [] },
      { blockName: "textarea-comments", key: "comments", value: "Excellent! Keep up the great work." },
    ],
  },

  // ========================================
  // Employee Onboarding (form-002)
  // ========================================
  {
    id: "seed-sub-005",
    formId: "seed-form-002",
    respondentName: "Alex Thompson",
    respondentEmail: "alex.thompson@personal.com",
    submittedAt: new Date("2026-06-10T08:00:00Z"),
    responses: [
      { blockName: "text-fullname", key: "full_name", value: "Alexander James Thompson" },
      { blockName: "email-personal", key: "personal_email", value: "alex.thompson@personal.com" },
      { blockName: "text-phone", key: "phone", value: "+1 (555) 123-4567" },
      { blockName: "select-department", key: "department", value: "Engineering" },
      { blockName: "select-role", key: "job_role", value: "Software Engineer" },
      { blockName: "radio-tshirt", key: "tshirt_size", value: "L" },
      { blockName: "checkbox-equipment", key: "equipment_needed", value: ["Laptop", "Monitor", "Keyboard", "Mouse", "Headphones"] },
      { blockName: "checkbox-terms", key: "agree_policies", value: true },
    ],
  },
  {
    id: "seed-sub-006",
    formId: "seed-form-002",
    respondentName: "Priya Patel",
    respondentEmail: "priya.patel@gmail.com",
    submittedAt: new Date("2026-06-12T09:30:00Z"),
    responses: [
      { blockName: "text-fullname", key: "full_name", value: "Priya Kumari Patel" },
      { blockName: "email-personal", key: "personal_email", value: "priya.patel@gmail.com" },
      { blockName: "text-phone", key: "phone", value: "+1 (555) 234-5678" },
      { blockName: "select-department", key: "department", value: "Product" },
      { blockName: "select-role", key: "job_role", value: "Product Manager" },
      { blockName: "radio-tshirt", key: "tshirt_size", value: "M" },
      { blockName: "checkbox-equipment", key: "equipment_needed", value: ["Laptop", "Monitor", "Webcam"] },
      { blockName: "checkbox-terms", key: "agree_policies", value: true },
    ],
  },
  {
    id: "seed-sub-007",
    formId: "seed-form-002",
    respondentName: "David Kim",
    respondentEmail: "dkim@yahoo.com",
    submittedAt: new Date("2026-06-17T11:00:00Z"),
    responses: [
      { blockName: "text-fullname", key: "full_name", value: "David Kim" },
      { blockName: "email-personal", key: "personal_email", value: "dkim@yahoo.com" },
      { blockName: "text-phone", key: "phone", value: "+1 (555) 345-6789" },
      { blockName: "select-department", key: "department", value: "Design" },
      { blockName: "select-role", key: "job_role", value: "Designer" },
      { blockName: "radio-tshirt", key: "tshirt_size", value: "XL" },
      { blockName: "checkbox-equipment", key: "equipment_needed", value: ["Laptop", "Monitor", "Mouse", "Headphones"] },
      { blockName: "checkbox-terms", key: "agree_policies", value: true },
    ],
  },

  // ========================================
  // Product Feedback (form-003)
  // ========================================
  {
    id: "seed-sub-008",
    formId: "seed-form-003",
    respondentName: null,
    respondentEmail: null,
    submittedAt: new Date("2026-06-14T13:25:00Z"),
    responses: [
      { blockName: "text-name", key: "user_name", value: "" },
      { blockName: "email-contact", key: "user_email", value: "" },
      { blockName: "select-product", key: "product_name", value: "FormKit Builder" },
      { blockName: "number-rating", key: "experience_rating", value: 9 },
      { blockName: "radio-recommend", key: "would_recommend", value: "Definitely" },
      { blockName: "textarea-feedback", key: "likes", value: "Intuitive drag-and-drop interface, great form templates!" },
      { blockName: "textarea-improvements", key: "improvements", value: "Would love to see more integrations with third-party services." },
    ],
  },
  {
    id: "seed-sub-009",
    formId: "seed-form-003",
    respondentName: "Lisa Anderson",
    respondentEmail: "lisa.anderson@company.org",
    submittedAt: new Date("2026-06-19T15:40:00Z"),
    responses: [
      { blockName: "text-name", key: "user_name", value: "Lisa Anderson" },
      { blockName: "email-contact", key: "user_email", value: "lisa.anderson@company.org" },
      { blockName: "select-product", key: "product_name", value: "FormKit Analytics" },
      { blockName: "number-rating", key: "experience_rating", value: 8 },
      { blockName: "radio-recommend", key: "would_recommend", value: "Probably" },
      { blockName: "textarea-feedback", key: "likes", value: "Detailed analytics and beautiful charts" },
      { blockName: "textarea-improvements", key: "improvements", value: "Custom date ranges for reports would be helpful" },
    ],
  },
  {
    id: "seed-sub-010",
    formId: "seed-form-003",
    respondentName: "Robert Garcia",
    respondentEmail: "rgarcia@email.com",
    submittedAt: new Date("2026-06-21T10:10:00Z"),
    responses: [
      { blockName: "text-name", key: "user_name", value: "Robert Garcia" },
      { blockName: "email-contact", key: "user_email", value: "rgarcia@email.com" },
      { blockName: "select-product", key: "product_name", value: "FormKit API" },
      { blockName: "number-rating", key: "experience_rating", value: 10 },
      { blockName: "radio-recommend", key: "would_recommend", value: "Definitely" },
      { blockName: "textarea-feedback", key: "likes", value: "Well-documented API, easy to integrate, excellent developer experience" },
      { blockName: "textarea-improvements", key: "improvements", value: "All good! Maybe add webhook support for real-time events." },
    ],
  },

  // ========================================
  // Bug Report (form-005)
  // ========================================
  {
    id: "seed-sub-011",
    formId: "seed-form-005",
    respondentName: null,
    respondentEmail: null,
    submittedAt: new Date("2026-06-13T11:30:00Z"),
    responses: [
      { blockName: "text-bug-title", key: "bug_title", value: "Form preview not rendering checkbox groups correctly" },
      { blockName: "select-severity", key: "severity", value: "Medium - Feature Partially Working" },
      { blockName: "select-component", key: "component", value: "Form Preview" },
      { blockName: "textarea-steps", key: "steps_to_reproduce", value: "1. Create a new form\n2. Add checkbox group with 5+ options\n3. Open preview\n4. Checkboxes appear stacked instead of in grid layout" },
      { blockName: "textarea-expected", key: "expected_behavior", value: "Checkboxes should display in a responsive grid layout" },
      { blockName: "textarea-actual", key: "actual_behavior", value: "All checkboxes are stacked vertically regardless of screen size" },
      { blockName: "text-browser", key: "browser_env", value: "Chrome 126 on macOS Sonoma" },
    ],
  },
  {
    id: "seed-sub-012",
    formId: "seed-form-005",
    respondentName: null,
    respondentEmail: null,
    submittedAt: new Date("2026-06-22T14:15:00Z"),
    responses: [
      { blockName: "text-bug-title", key: "bug_title", value: "Dashboard forms not loading on Safari" },
      { blockName: "select-severity", key: "severity", value: "High - Major Feature Broken" },
      { blockName: "select-component", key: "component", value: "Dashboard" },
      { blockName: "textarea-steps", key: "steps_to_reproduce", value: "1. Open dashboard on Safari\n2. Wait for forms to load\n3. Page shows loading spinner indefinitely" },
      { blockName: "textarea-expected", key: "expected_behavior", value: "Dashboard should load and display all forms within 2-3 seconds" },
      { blockName: "textarea-actual", key: "actual_behavior", value: "Loading spinner continues indefinitely, forms never appear" },
      { blockName: "text-browser", key: "browser_env", value: "Safari 17.5 on macOS" },
    ],
  },
  // Total: 12 submissions across 4 published forms (form-004 is draft, no submissions)
];

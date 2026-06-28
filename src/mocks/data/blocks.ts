/**
 * Mock blocks - Form fields for each mock form
 * Covers various field types and edge cases
 */

export const mockBlocks: Record<
  string,
  Array<{
    id: string;
    type: string;
    name: string;
    order: number;
    props: Record<string, unknown>;
  }>
> = {
  // Form 1: Standard customer feedback (8 blocks)
  "mock-form-001": [
    {
      id: "block-001-01",
      type: "heading",
      name: "heading_welcome",
      order: 0,
      props: { text: "Customer Feedback Survey", level: 1 },
    },
    {
      id: "block-001-02",
      type: "paragraph",
      name: "paragraph_intro",
      order: 1,
      props: {
        text: "Thank you for choosing our service. Your feedback helps us improve.",
      },
    },
    {
      id: "block-001-03",
      type: "text",
      name: "customer_name",
      order: 2,
      props: {
        label: "Your Name",
        key: "customer_name",
        required: true,
        placeholder: "John Doe",
      },
    },
    {
      id: "block-001-04",
      type: "email",
      name: "customer_email",
      order: 3,
      props: {
        label: "Email Address",
        key: "customer_email",
        required: true,
        placeholder: "john@example.com",
      },
    },
    {
      id: "block-001-05",
      type: "radio",
      name: "satisfaction_level",
      order: 4,
      props: {
        label: "Overall Satisfaction",
        key: "satisfaction_level",
        required: true,
        orientation: "vertical",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
      },
    },
    {
      id: "block-001-06",
      type: "textarea",
      name: "additional_comments",
      order: 5,
      props: {
        label: "Additional Comments",
        key: "additional_comments",
        required: false,
        rows: 4,
        placeholder: "Share any additional thoughts...",
      },
    },
    {
      id: "block-001-07",
      type: "checkbox",
      name: "recommend",
      order: 6,
      props: {
        label: "I would recommend this service to others",
        key: "recommend",
        required: false,
      },
    },
    {
      id: "block-001-08",
      type: "button",
      name: "button_submit",
      order: 7,
      props: { label: "Submit Feedback", variant: "primary" },
    },
  ],

  // Form 2: Long employee survey (28 blocks - edge case)
  "mock-form-002": [
    {
      id: "block-002-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Employee Satisfaction Survey", level: 1 },
    },
    {
      id: "block-002-02",
      type: "paragraph",
      name: "intro",
      order: 1,
      props: {
        text: "This survey will take approximately 15-20 minutes to complete.",
      },
    },

    // Section 1: Personal Information
    {
      id: "block-002-03",
      type: "heading",
      name: "section_1",
      order: 2,
      props: { text: "Section 1: Personal Information", level: 2 },
    },
    {
      id: "block-002-04",
      type: "text",
      name: "employee_id",
      order: 3,
      props: { label: "Employee ID", key: "employee_id", required: true },
    },
    {
      id: "block-002-05",
      type: "text",
      name: "department",
      order: 4,
      props: { label: "Department", key: "department", required: true },
    },
    {
      id: "block-002-06",
      type: "select",
      name: "tenure",
      order: 5,
      props: {
        label: "Years at Company",
        key: "tenure",
        required: true,
        options: [
          "Less than 1 year",
          "1-3 years",
          "3-5 years",
          "5-10 years",
          "10+ years",
        ],
      },
    },

    // Section 2: Work Environment
    {
      id: "block-002-07",
      type: "heading",
      name: "section_2",
      order: 6,
      props: { text: "Section 2: Work Environment", level: 2 },
    },
    {
      id: "block-002-08",
      type: "radio",
      name: "workspace_satisfaction",
      order: 7,
      props: {
        label: "Workspace Comfort",
        key: "workspace_satisfaction",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },
    {
      id: "block-002-09",
      type: "radio",
      name: "equipment_quality",
      order: 8,
      props: {
        label: "Equipment Quality",
        key: "equipment_quality",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },
    {
      id: "block-002-10",
      type: "checkbox",
      name: "remote_work",
      order: 9,
      props: {
        label: "I have access to remote work options",
        key: "remote_work",
      },
    },

    // Section 3: Management
    {
      id: "block-002-11",
      type: "heading",
      name: "section_3",
      order: 10,
      props: { text: "Section 3: Management & Leadership", level: 2 },
    },
    {
      id: "block-002-12",
      type: "radio",
      name: "manager_communication",
      order: 11,
      props: {
        label: "Manager Communication",
        key: "manager_communication",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },
    {
      id: "block-002-13",
      type: "radio",
      name: "feedback_frequency",
      order: 12,
      props: {
        label: "Feedback Frequency",
        key: "feedback_frequency",
        required: true,
        orientation: "horizontal",
        options: ["Too Frequent", "Just Right", "Not Enough"],
      },
    },
    {
      id: "block-002-14",
      type: "textarea",
      name: "management_comments",
      order: 13,
      props: {
        label: "Additional Thoughts on Management",
        key: "management_comments",
        rows: 3,
      },
    },

    // Section 4: Career Development
    {
      id: "block-002-15",
      type: "heading",
      name: "section_4",
      order: 14,
      props: { text: "Section 4: Career Development", level: 2 },
    },
    {
      id: "block-002-16",
      type: "radio",
      name: "growth_opportunities",
      order: 15,
      props: {
        label: "Career Growth Opportunities",
        key: "growth_opportunities",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },
    {
      id: "block-002-17",
      type: "radio",
      name: "training_quality",
      order: 16,
      props: {
        label: "Training Programs",
        key: "training_quality",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },
    {
      id: "block-002-18",
      type: "checkbox",
      name: "mentorship_program",
      order: 17,
      props: {
        label: "I participate in a mentorship program",
        key: "mentorship_program",
      },
    },

    // Section 5: Compensation
    {
      id: "block-002-19",
      type: "heading",
      name: "section_5",
      order: 18,
      props: { text: "Section 5: Compensation & Benefits", level: 2 },
    },
    {
      id: "block-002-20",
      type: "radio",
      name: "salary_satisfaction",
      order: 19,
      props: {
        label: "Salary Satisfaction",
        key: "salary_satisfaction",
        required: true,
        orientation: "horizontal",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
      },
    },
    {
      id: "block-002-21",
      type: "radio",
      name: "benefits_satisfaction",
      order: 20,
      props: {
        label: "Benefits Package",
        key: "benefits_satisfaction",
        required: true,
        orientation: "horizontal",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
      },
    },

    // Section 6: Work-Life Balance
    {
      id: "block-002-22",
      type: "heading",
      name: "section_6",
      order: 21,
      props: { text: "Section 6: Work-Life Balance", level: 2 },
    },
    {
      id: "block-002-23",
      type: "radio",
      name: "workload",
      order: 22,
      props: {
        label: "Workload Level",
        key: "workload",
        required: true,
        orientation: "horizontal",
        options: ["Too Heavy", "Just Right", "Too Light"],
      },
    },
    {
      id: "block-002-24",
      type: "radio",
      name: "work_life_balance",
      order: 23,
      props: {
        label: "Overall Work-Life Balance",
        key: "work_life_balance",
        required: true,
        orientation: "horizontal",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      },
    },

    // Final thoughts
    {
      id: "block-002-25",
      type: "heading",
      name: "section_7",
      order: 24,
      props: { text: "Final Thoughts", level: 2 },
    },
    {
      id: "block-002-26",
      type: "textarea",
      name: "suggestions",
      order: 25,
      props: {
        label: "Suggestions for Improvement",
        key: "suggestions",
        rows: 5,
        placeholder: "What can we do better?",
      },
    },
    {
      id: "block-002-27",
      type: "checkbox",
      name: "followup",
      order: 26,
      props: {
        label: "I'm willing to participate in a follow-up discussion",
        key: "followup",
      },
    },
    {
      id: "block-002-28",
      type: "button",
      name: "button_submit",
      order: 27,
      props: { label: "Submit Survey", variant: "primary" },
    },
  ],

  // Form 3: International form with unicode (6 blocks)
  "mock-form-003": [
    {
      id: "block-003-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "国际反馈表 🌍", level: 1 },
    },
    {
      id: "block-003-02",
      type: "text",
      name: "name_field",
      order: 1,
      props: { label: "姓名 / Name / Nom", key: "name_field", required: true },
    },
    {
      id: "block-003-03",
      type: "email",
      name: "email_field",
      order: 2,
      props: {
        label: "电子邮件 / Email / Correo electrónico",
        key: "email_field",
        required: true,
      },
    },
    {
      id: "block-003-04",
      type: "select",
      name: "language_preference",
      order: 3,
      props: {
        label: "语言偏好 / Language Preference",
        key: "language_preference",
        required: true,
        options: [
          "English 🇬🇧",
          "中文 🇨🇳",
          "Español 🇪🇸",
          "Français 🇫🇷",
          "العربية 🇸🇦",
          "Русский 🇷🇺",
        ],
      },
    },
    {
      id: "block-003-05",
      type: "textarea",
      name: "feedback_text",
      order: 4,
      props: {
        label: "反馈 / Feedback / Commentaires",
        key: "feedback_text",
        rows: 4,
      },
    },
    {
      id: "block-003-06",
      type: "button",
      name: "button_submit",
      order: 5,
      props: { label: "提交 / Submit / Soumettre", variant: "primary" },
    },
  ],

  // Form 4: Empty draft (0 blocks - edge case)
  "mock-form-004": [],

  // Form 5: Bug report with all field types (15 blocks)
  "mock-form-005": [
    {
      id: "block-005-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Bug Report", level: 1 },
    },
    {
      id: "block-005-02",
      type: "paragraph",
      name: "intro",
      order: 1,
      props: {
        text: "Please provide as much detail as possible to help us resolve the issue quickly.",
      },
    },
    {
      id: "block-005-03",
      type: "text",
      name: "bug_title",
      order: 2,
      props: {
        label: "Bug Title",
        key: "bug_title",
        required: true,
        placeholder: "Brief summary of the issue",
      },
    },
    {
      id: "block-005-04",
      type: "select",
      name: "severity",
      order: 3,
      props: {
        label: "Severity",
        key: "severity",
        required: true,
        options: [
          "Critical - System Down",
          "High - Major Feature Broken",
          "Medium - Feature Partially Working",
          "Low - Minor Issue",
        ],
      },
    },
    {
      id: "block-005-05",
      type: "select",
      name: "category",
      order: 4,
      props: {
        label: "Category",
        key: "category",
        required: true,
        options: [
          "User Interface",
          "Performance",
          "Security",
          "Data Loss",
          "Integration",
          "Other",
        ],
      },
    },
    {
      id: "block-005-06",
      type: "textarea",
      name: "description",
      order: 5,
      props: {
        label: "Detailed Description",
        key: "description",
        required: true,
        rows: 5,
        placeholder: "Describe what happened...",
      },
    },
    {
      id: "block-005-07",
      type: "textarea",
      name: "steps_to_reproduce",
      order: 6,
      props: {
        label: "Steps to Reproduce",
        key: "steps_to_reproduce",
        required: true,
        rows: 5,
        placeholder: "1. Go to...\n2. Click on...\n3. See error",
      },
    },
    {
      id: "block-005-08",
      type: "textarea",
      name: "expected_behavior",
      order: 7,
      props: {
        label: "Expected Behavior",
        key: "expected_behavior",
        required: true,
        rows: 3,
        placeholder: "What should have happened?",
      },
    },
    {
      id: "block-005-09",
      type: "textarea",
      name: "actual_behavior",
      order: 8,
      props: {
        label: "Actual Behavior",
        key: "actual_behavior",
        required: true,
        rows: 3,
        placeholder: "What actually happened?",
      },
    },
    {
      id: "block-005-10",
      type: "text",
      name: "browser",
      order: 9,
      props: {
        label: "Browser",
        key: "browser",
        placeholder: "e.g., Chrome 120, Firefox 115",
      },
    },
    {
      id: "block-005-11",
      type: "text",
      name: "os",
      order: 10,
      props: {
        label: "Operating System",
        key: "os",
        placeholder: "e.g., Windows 11, macOS 14",
      },
    },
    {
      id: "block-005-12",
      type: "text",
      name: "reporter_email",
      order: 11,
      props: {
        label: "Your Email",
        key: "reporter_email",
        required: true,
        placeholder: "for follow-up questions",
      },
    },
    {
      id: "block-005-13",
      type: "checkbox",
      name: "can_reproduce",
      order: 12,
      props: {
        label: "I can consistently reproduce this bug",
        key: "can_reproduce",
      },
    },
    {
      id: "block-005-14",
      type: "checkbox",
      name: "data_attached",
      order: 13,
      props: {
        label: "I have screenshots or logs to share",
        key: "data_attached",
      },
    },
    {
      id: "block-005-15",
      type: "button",
      name: "button_submit",
      order: 14,
      props: { label: "Submit Bug Report", variant: "primary" },
    },
  ],

  // Form 6: Simple contact (5 blocks - minimal)
  "mock-form-006": [
    {
      id: "block-006-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Contact Us", level: 1 },
    },
    {
      id: "block-006-02",
      type: "text",
      name: "contact_name",
      order: 1,
      props: { label: "Name", key: "contact_name", required: true },
    },
    {
      id: "block-006-03",
      type: "email",
      name: "contact_email",
      order: 2,
      props: { label: "Email", key: "contact_email", required: true },
    },
    {
      id: "block-006-04",
      type: "textarea",
      name: "message",
      order: 3,
      props: { label: "Message", key: "message", required: true, rows: 5 },
    },
    {
      id: "block-006-05",
      type: "button",
      name: "button_submit",
      order: 4,
      props: { label: "Send Message", variant: "primary" },
    },
  ],

  // Form 7: Event registration with sections (18 blocks)
  "mock-form-007": [
    {
      id: "block-007-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Tech Conference 2026 Registration", level: 1 },
    },
    {
      id: "block-007-02",
      type: "paragraph",
      name: "intro",
      order: 1,
      props: {
        text: "September 15-17, 2026 • San Francisco Convention Center",
      },
    },

    {
      id: "block-007-03",
      type: "heading",
      name: "section_personal",
      order: 2,
      props: { text: "Personal Information", level: 2 },
    },
    {
      id: "block-007-04",
      type: "text",
      name: "first_name",
      order: 3,
      props: { label: "First Name", key: "first_name", required: true },
    },
    {
      id: "block-007-05",
      type: "text",
      name: "last_name",
      order: 4,
      props: { label: "Last Name", key: "last_name", required: true },
    },
    {
      id: "block-007-06",
      type: "email",
      name: "email",
      order: 5,
      props: { label: "Email", key: "email", required: true },
    },
    {
      id: "block-007-07",
      type: "text",
      name: "company",
      order: 6,
      props: { label: "Company", key: "company" },
    },
    {
      id: "block-007-08",
      type: "text",
      name: "job_title",
      order: 7,
      props: { label: "Job Title", key: "job_title" },
    },

    {
      id: "block-007-09",
      type: "heading",
      name: "section_ticket",
      order: 8,
      props: { text: "Ticket Selection", level: 2 },
    },
    {
      id: "block-007-10",
      type: "radio",
      name: "ticket_type",
      order: 9,
      props: {
        label: "Ticket Type",
        key: "ticket_type",
        required: true,
        orientation: "horizontal",
        options: ["Early Bird - $299", "Regular - $499", "VIP - $999"],
      },
    },
    {
      id: "block-007-11",
      type: "select",
      name: "days_attending",
      order: 10,
      props: {
        label: "Days Attending",
        key: "days_attending",
        required: true,
        orientation: "horizontal",
        options: ["All 3 Days", "Day 1 only", "Day 2 only", "Day 3 only"],
      },
    },

    {
      id: "block-007-12",
      type: "heading",
      name: "section_preferences",
      order: 11,
      props: { text: "Preferences", level: 2 },
    },
    {
      id: "block-007-13",
      type: "checkbox",
      name: "dietary_vegetarian",
      order: 12,
      props: { label: "Vegetarian meals", key: "dietary_vegetarian" },
    },
    {
      id: "block-007-14",
      type: "checkbox",
      name: "dietary_vegan",
      order: 13,
      props: { label: "Vegan meals", key: "dietary_vegan" },
    },
    {
      id: "block-007-15",
      type: "checkbox",
      name: "dietary_gluten_free",
      order: 14,
      props: { label: "Gluten-free meals", key: "dietary_gluten_free" },
    },
    {
      id: "block-007-16",
      type: "textarea",
      name: "special_requirements",
      order: 15,
      props: {
        label: "Special Requirements",
        key: "special_requirements",
        rows: 3,
        placeholder: "Accessibility needs, allergies, etc.",
      },
    },
    {
      id: "block-007-17",
      type: "checkbox",
      name: "marketing_consent",
      order: 16,
      props: {
        label: "Send me updates about future events",
        key: "marketing_consent",
      },
    },
    {
      id: "block-007-18",
      type: "button",
      name: "button_submit",
      order: 17,
      props: { label: "Complete Registration", variant: "primary" },
    },
  ],

  // Form 8: Draft performance review (12 blocks)
  "mock-form-008": [
    {
      id: "block-008-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Q3 Performance Review", level: 1 },
    },
    {
      id: "block-008-02",
      type: "paragraph",
      name: "intro",
      order: 1,
      props: { text: "Self-assessment for July - September 2026" },
    },
    {
      id: "block-008-03",
      type: "text",
      name: "employee_name",
      order: 2,
      props: { label: "Employee Name", key: "employee_name", required: true },
    },
    {
      id: "block-008-04",
      type: "text",
      name: "manager_name",
      order: 3,
      props: { label: "Manager Name", key: "manager_name", required: true },
    },
    {
      id: "block-008-05",
      type: "heading",
      name: "section_goals",
      order: 4,
      props: { text: "Goal Achievement", level: 2 },
    },
    {
      id: "block-008-06",
      type: "textarea",
      name: "goals_achieved",
      order: 5,
      props: {
        label: "Goals Achieved",
        key: "goals_achieved",
        rows: 5,
        required: true,
      },
    },
    {
      id: "block-008-07",
      type: "textarea",
      name: "challenges_faced",
      order: 6,
      props: { label: "Challenges Faced", key: "challenges_faced", rows: 5 },
    },
    {
      id: "block-008-08",
      type: "heading",
      name: "section_skills",
      order: 7,
      props: { text: "Skills Development", level: 2 },
    },
    {
      id: "block-008-09",
      type: "textarea",
      name: "skills_improved",
      order: 8,
      props: { label: "Skills Improved", key: "skills_improved", rows: 4 },
    },
    {
      id: "block-008-10",
      type: "textarea",
      name: "skills_to_develop",
      order: 9,
      props: { label: "Skills to Develop", key: "skills_to_develop", rows: 4 },
    },
    {
      id: "block-008-11",
      type: "heading",
      name: "section_next",
      order: 10,
      props: { text: "Next Quarter Goals", level: 2 },
    },
    {
      id: "block-008-12",
      type: "textarea",
      name: "q4_goals",
      order: 11,
      props: { label: "Q4 Goals", key: "q4_goals", rows: 5, required: true },
    },
  ],

  // Form 9: Research consent with very long text (7 blocks)
  "mock-form-009": [
    {
      id: "block-009-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Research Study Consent", level: 1 },
    },
    {
      id: "block-009-02",
      type: "paragraph",
      name: "consent_text",
      order: 1,
      props: {
        text: "By participating in this research study, you acknowledge that you have read and understood the study protocol, your rights as a participant including the right to withdraw at any time without penalty, the potential risks and benefits of participation, how your data will be collected, stored, and used in accordance with GDPR and institutional guidelines, and that your participation is entirely voluntary. All personally identifiable information will be anonymized prior to analysis and publication of results.",
      },
    },
    {
      id: "block-009-03",
      type: "text",
      name: "participant_name",
      order: 2,
      props: { label: "Full Name", key: "participant_name", required: true },
    },
    {
      id: "block-009-04",
      type: "email",
      name: "participant_email",
      order: 3,
      props: {
        label: "Email Address",
        key: "participant_email",
        required: true,
      },
    },
    {
      id: "block-009-05",
      type: "text",
      name: "participant_age",
      order: 4,
      props: { label: "Age", key: "participant_age", required: true },
    },
    {
      id: "block-009-06",
      type: "checkbox",
      name: "consent_agree",
      order: 5,
      props: {
        label:
          "I have read, understood, and agree to participate in this research study under the terms described above",
        key: "consent_agree",
        required: true,
      },
    },
    {
      id: "block-009-07",
      type: "button",
      name: "button_submit",
      order: 6,
      props: { label: "Submit Consent", variant: "primary" },
    },
  ],

  // Form 10: Product feature requests (10 blocks)
  "mock-form-010": [
    {
      id: "block-010-01",
      type: "heading",
      name: "heading_main",
      order: 0,
      props: { text: "Product Feature Requests", level: 1 },
    },
    {
      id: "block-010-02",
      type: "paragraph",
      name: "intro",
      order: 1,
      props: {
        text: "Help shape the future of our products by sharing your ideas!",
      },
    },
    {
      id: "block-010-03",
      type: "text",
      name: "requester_name",
      order: 2,
      props: { label: "Your Name", key: "requester_name", required: true },
    },
    {
      id: "block-010-04",
      type: "email",
      name: "requester_email",
      order: 3,
      props: { label: "Email", key: "requester_email", required: true },
    },
    {
      id: "block-010-05",
      type: "select",
      name: "product",
      order: 4,
      props: {
        label: "Which Product?",
        key: "product",
        required: true,
        options: [
          "FormKit Builder",
          "FormKit Analytics",
          "FormKit API",
          "FormKit Mobile",
        ],
      },
    },
    {
      id: "block-010-06",
      type: "text",
      name: "feature_title",
      order: 5,
      props: {
        label: "Feature Title",
        key: "feature_title",
        required: true,
        placeholder: "Brief name for the feature",
      },
    },
    {
      id: "block-010-07",
      type: "textarea",
      name: "feature_description",
      order: 6,
      props: {
        label: "Description",
        key: "feature_description",
        required: true,
        rows: 5,
        placeholder: "Describe the feature in detail...",
      },
    },
    {
      id: "block-010-08",
      type: "textarea",
      name: "use_case",
      order: 7,
      props: {
        label: "Use Case",
        key: "use_case",
        required: true,
        rows: 4,
        placeholder: "How would you use this feature?",
      },
    },
    {
      id: "block-010-09",
      type: "radio",
      name: "priority",
      order: 8,
      props: {
        label: "How important is this to you?",
        key: "priority",
        required: true,
        orientation: "vertical",
        options: [
          "Critical - Can't work without it",
          "High - Would significantly improve workflow",
          "Medium - Nice to have",
          "Low - Optional enhancement",
        ],
      },
    },
    {
      id: "block-010-10",
      type: "button",
      name: "button_submit",
      order: 9,
      props: { label: "Submit Feature Request", variant: "primary" },
    },
  ],
};

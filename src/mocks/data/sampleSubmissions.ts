import { FormSubmission } from "@/lib/types/form";

/**
 * Generate 20 sample submissions for the form
 * Each submission has responses for the 8 field-based blocks
 */

const names = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Brown",
  "David Wilson",
  "Sarah Davis",
  "Robert Miller",
  "Jennifer Garcia",
  "William Martinez",
  "Lisa Anderson",
  "James Taylor",
  "Mary Thomas",
  "Richard Moore",
  "Patricia Jackson",
  "Charles White",
  "Linda Harris",
  "Thomas Clark",
  "Barbara Lewis",
  "Daniel Robinson",
  "Susan Walker",
];

const emails = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "michael.j@example.com",
  "emily.brown@example.com",
  "david.w@example.com",
  "sarah.davis@example.com",
  "robert.m@example.com",
  "jennifer.g@example.com",
  "william.m@example.com",
  "lisa.a@example.com",
  "james.t@example.com",
  "mary.thomas@example.com",
  "richard.m@example.com",
  "patricia.j@example.com",
  "charles.w@example.com",
  "linda.h@example.com",
  "thomas.c@example.com",
  "barbara.l@example.com",
  "daniel.r@example.com",
  "susan.w@example.com",
];

const referralSources = [
  "Social Media",
  "Search Engine",
  "Friend or Family",
  "Advertisement",
  "Other",
];

const satisfactionLevels = [
  "Very Satisfied",
  "Satisfied",
  "Neutral",
  "Dissatisfied",
  "Very Dissatisfied",
];

const featuresOptions = [
  ["Dashboard", "Reports"],
  ["Dashboard", "Notifications", "Mobile App"],
  ["Reports", "API Access"],
  ["Dashboard", "Mobile App"],
  ["Notifications"],
  ["Dashboard", "Reports", "API Access"],
  ["Mobile App", "API Access"],
  ["Dashboard"],
  ["Reports", "Notifications"],
  ["Dashboard", "Reports", "Notifications", "Mobile App"],
];

const comments = [
  "Great service overall, very satisfied!",
  "The mobile app needs improvement.",
  "Love the new dashboard features.",
  "API documentation could be better.",
  "Excellent customer support!",
  null,
  "Reports are very helpful for our team.",
  "Would like more notification options.",
  null,
  "The interface is intuitive and easy to use.",
  "Some features are hard to find.",
  null,
  "Amazing product, highly recommend!",
  "Good but could use more integrations.",
  null,
  "Very reliable and stable platform.",
  "The learning curve is steep for new users.",
  null,
  "Best tool in its category!",
  "Pricing is a bit high but worth it.",
];

/**
 * Generate submissions with varying data
 */
export const sampleSubmissions: FormSubmission[] = Array.from(
  { length: 20 },
  (_, index) => {
    const submissionDate = new Date(2026, 5, 1 + index, 10 + index, 0, 0);

    return {
      id: `submission-${String(index + 1).padStart(3, "0")}`,
      submittedAt: submissionDate.toISOString(),
      responses: [
        {
          id: `res-${index + 1}-1`,
          blockId: "block-text-1",
          blockType: "text",
          blockName: "text-block-text-1",
          blockProps: {
            label: "Full Name",
            key: "full_name",
            required: true,
          },
          value: names[index],
        },
        {
          id: `res-${index + 1}-2`,
          blockId: "block-email-1",
          blockType: "email",
          blockName: "email-block-email-1",
          blockProps: {
            label: "Email Address",
            key: "email",
            required: true,
          },
          value: emails[index],
        },
        {
          id: `res-${index + 1}-3`,
          blockId: "block-number-1",
          blockType: "number",
          blockName: "number-block-number-1",
          blockProps: {
            label: "How many years have you been our customer?",
            key: "years_customer",
            required: true,
          },
          value: Math.floor(Math.random() * 10) + 1,
        },
        {
          id: `res-${index + 1}-4`,
          blockId: "block-select-1",
          blockType: "select",
          blockName: "select-block-select-1",
          blockProps: {
            label: "How did you hear about us?",
            key: "referral_source",
            required: true,
          },
          value: referralSources[index % referralSources.length],
        },
        {
          id: `res-${index + 1}-5`,
          blockId: "block-radio-1",
          blockType: "radio",
          blockName: "radio-block-radio-1",
          blockProps: {
            label: "Overall Satisfaction",
            key: "satisfaction",
            required: true,
          },
          value: satisfactionLevels[index % satisfactionLevels.length],
        },
        {
          id: `res-${index + 1}-6`,
          blockId: "block-checkbox-1",
          blockType: "checkbox",
          blockName: "checkbox-block-checkbox-1",
          blockProps: {
            label: "Which features do you use regularly?",
            key: "features_used",
            required: false,
          },
          value: featuresOptions[index % featuresOptions.length],
        },
        {
          id: `res-${index + 1}-7`,
          blockId: "block-textarea-1",
          blockType: "textarea",
          blockName: "textarea-block-textarea-1",
          blockProps: {
            label: "Additional Comments",
            key: "comments",
            required: false,
          },
          value: comments[index],
        },
        {
          id: `res-${index + 1}-8`,
          blockId: "block-checkbox-2",
          blockType: "checkbox",
          blockName: "checkbox-block-checkbox-2",
          blockProps: {
            label: "I agree to the terms and conditions",
            key: "accept_terms",
            required: true,
          },
          value: true,
        },
      ],
    };
  }
);

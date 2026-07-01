import { FormStatus, FormStatusUpdateMessage } from "@/lib/types/form";

export const OPINION_BASED_FIELD_BLOCKS = [
  "text",
  "number",
  "email",
  "password",
  "url",
  "textarea",
];

export const CHOICE_BASED_FIELD_BLOCKS = ["checkbox", "select", "radio"];

export const ALL_FIELD_BLOCKS = [
  ...OPINION_BASED_FIELD_BLOCKS,
  ...CHOICE_BASED_FIELD_BLOCKS,
];

/**
 * Form Metric Labels
 * Maps metric keys to their display labels
 */
export const formMetricLabel: Record<string, string> = {
  fields: "Fields",
  submissions: "Submissions",
  views: "Views",
};

export const formStatusLabel: Record<FormStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export const formStatusVariant: Record<
  FormStatus,
  "success" | "warning" | "error" | "info" | "neutral"
> = {
  draft: "neutral",
  published: "success",
  archived: "warning",
};

export const FormFilterOptions = [
  { value: "all", label: "All Forms" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

/**
 * Messages for form status transitions.
 * Keys represent the target status being transitioned TO.
 */
export const FORM_STATUS_UPDATE_MESSAGES: Record<
  FormStatus,
  FormStatusUpdateMessage
> = {
  draft: {
    transitioning: "Moving to draft...",
    success: {
      title: "Form moved to draft",
      description:
        "The form is now in draft mode and no longer accepting submissions.",
    },
    error: {
      title: "Status update failed",
      description: "Unable to move the form to draft. Please try again.",
    },
  },
  published: {
    transitioning: "Publishing form...",
    success: {
      title: "Form is now live",
      description:
        "Published successfully. Your form is ready to collect new submissions.",
    },
    error: {
      title: "Publish failed",
      description: "Unable to publish the form. Please try again.",
    },
  },
  archived: {
    transitioning: "Archiving form...",
    success: {
      title: "Form archived",
      description:
        "The form has been archived and is no longer accepting submissions.",
    },
    error: {
      title: "Archive failed",
      description: "Unable to archive the form. Please try again.",
    },
  },
};

import { FormStatus, FormStatusUpdateMessage } from "@/lib/types/form";
/**
 * Form Metric Labels
 * Maps metric keys to their display labels
 */
export const formMetricLabel: Record<string, string> = {
  fields: "Blocks",
  submissions: "Submissions",
  completion: "Completion",
};

export const formStatusLabel: Record<FormStatus, string> = {
  draft: "Draft",
  published: "Published",
};

export const formStatusVariant: Record<
  FormStatus,
  "success" | "warning" | "error" | "info" | "neutral"
> = {
  draft: "warning",
  published: "success",
};

/**
 * Messages for form status transitions.
 * Keys represent the target status being transitioned TO.
 */
export const FORM_STATUS_UPDATE_MESSAGES: Record<
  FormStatus,
  FormStatusUpdateMessage
> = {
  draft: {
    transitioning: "Unpublishing form...",
    success: {
      title: "Form moved to draft",
      description:
        "Unpublished successfully. The form is no longer accepting submissions.",
    },
    error: {
      title: "Unpublish failed",
      description: "Unable to unpublish the form. Please try again.",
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
};

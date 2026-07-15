export type TextBlockType = "heading" | "paragraph" | "separator";
export type InputBlockType =
  | "text"
  | "number"
  | "url"
  | "email"
  | "password"
  | "textarea"
  | "radio"
  | "checkbox"
  | "select";
export type MediaBlockType = "buttons";

export type FormBlockType = TextBlockType | InputBlockType | MediaBlockType;

export type FormBlockValueType =
  | string
  | number
  | boolean
  | string[]
  | undefined;

export type FormBlockPropType =
  | "string"
  | "long-string"
  | "number"
  | "boolean"
  | "list"
  | "select";

export type FormStatus = "draft" | "published" | "archived";

export type FormFilterStatus = "all" | FormStatus;

export type FormBlockOrientation = "horizontal" | "vertical";

export type FormTheme = "light" | "dark";

/**
 * A single response to a form field from a submission
 */
export interface FormResponse {
  id: string;
  blockId: string;
  blockType: FormBlockType;
  blockName: string;
  blockProps: FormBlockProps;
  value: string | number | boolean | string[] | null;
}

/**
 * A complete form submission containing multiple field responses
 */
export interface FormSubmission {
  id: string;
  submittedAt: string;
  responses: FormResponse[];
}

/**
 * Form block prop template - used for widget templates
 * Contains full metadata including labels, types, options and default values
 */
export interface FormBlockPropTemplate {
  key: string;
  label: string;
  type: FormBlockPropType;
  value: FormBlockValueType;

  // Number-based blocks
  min?: number;
  max?: number;
  step?: number;

  // String-based blocks (text, email, password, url, etc.)
  minLength?: number;
  maxLength?: number;

  // For choice-based blocks
  options?: { value: string; label: string }[];

  // Optional UI/UX-based blocks
  placeholder?: string;
  required?: boolean;
  hidden?: boolean;
}

/**
 * Form block props - normalized structure
 * Only stores values, metadata comes from templates
 */
export type FormBlockProps = Record<string, FormBlockValueType>;

export interface FormBlock {
  type: FormBlockType;
  id: string;
  name: string;
  props: FormBlockProps;
}

export interface FormConfig {
  id?: string; // Form ID for tracking (undefined for new forms)
  title: string;
  description?: string;
  slug: string;
  status?: FormStatus;
  theme: FormTheme;
  blocks: FormBlock[];
  submissionCount?: number;
}

/**
 * Form metric template - used for rendering metrics with labels
 * Contains full metadata including key, label and value
 */
export interface FormMetric {
  key: string;
  label: string;
  value: string | number;
}

/**
 * Form metrics - normalized structure
 * Only stores values, metadata comes from metricTemplates
 */
export type FormMetrics = Record<string, string | number>;

/**
 * Form page data - used for rendering form builder and public form views
 */
export interface FormPageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  theme: FormTheme;
  status: FormStatus;
  blocks: FormBlock[];
  submissionCount?: number;
}

/**
 * Form report page data - used for displaying form submissions and analytics
 */

export interface FormReportMetrics {
  submissions: number;
  views: number;
  starts: number;
  completions: number;
  submitAttempts: number;
}

export interface FormReportPageData {
  form: {
    id: string;
    title: string;
  };
  metrics: FormReportMetrics;
  submissions: FormSubmission[];
}

export interface DashboardForm {
  id: string;
  slug: string;
  title: string;
  status: FormStatus;
  metrics: FormMetrics;
  createdBy?: string | null;
  isAdmin?: boolean;
  createdAt: Date;
  publishedAt?: Date | null;
}

/**
 * Messages for form status transitions.
 * Structure for success and error messages when updating form status.
 */
export interface FormStatusUpdateMessage {
  transitioning: string;
  success: {
    title: string;
    description: string;
  };
  error: {
    title: string;
    description: string;
  };
}

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

export type FormStatus = "draft" | "published";

export type FormBlockOrientation = "horizontal" | "vertical";

/**
 * Form block prop template - used for widget templates
 * Contains full metadata including labels, types, options, and default values
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
  slug?: string;
  status?: FormStatus;
  theme: "light" | "dark";
  blocks: FormBlock[];
}

/**
 * Form metric template - used for rendering metrics with labels
 * Contains full metadata including key, label, and value
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

export interface DashboardForm {
  id: string;
  slug: string;
  title: string;
  status: FormStatus;
  metrics: FormMetrics;
}

export type DashboardForms = DashboardForm[];

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

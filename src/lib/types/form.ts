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
export type MediaBlockType = "button" | "buttons";

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

  // For select blocks
  options?: { value: string; label: string }[];

  // Optional UI/UX-based blocks
  placeholder?: string;
  required?: boolean;
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
  theme: "light" | "dark";
  blocks: FormBlock[];
}

export type FormStatus = "draft" | "published";

export interface FormMetric {
  key: string;
  label: string;
  value: string | number;
}

export interface FormListItem {
  id: string;
  name: string;
  status: FormStatus;
  metrics: FormMetric[];
}

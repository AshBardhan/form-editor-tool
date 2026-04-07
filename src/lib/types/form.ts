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
export type MediaBlockType = "button";

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

export interface FormBlockPropConfig {
  key: string;
  label: string;
  type: FormBlockPropType;
  value: FormBlockValueType;
}

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

export interface FormBlock {
  type: FormBlockType;
  id: string;
  name: string;
  props: FormBlockPropConfig[];
}

export interface FormData {
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

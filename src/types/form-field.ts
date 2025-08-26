export type TextFieldType = "heading" | "paragraph" | "separator";
export type InputFieldType =
  | "text"
  | "number"
  | "url"
  | "email"
  | "password"
  | "textarea"
  | "radio"
  | "checkbox"
  | "select";
export type MediaFieldType = "button";

export type FormFieldType = TextFieldType | InputFieldType | MediaFieldType;

export type FormFieldValueType =
  | string
  | number
  | boolean
  | string[]
  | undefined;

export type FormFieldPropType =
  | "string"
  | "long-string"
  | "number"
  | "boolean"
  | "list"
  | "select";

export interface FormFieldPropConfig {
  key: string;
  label: string;
  type: FormFieldPropType;
  value: FormFieldValueType;
}

export interface FormFieldPropTemplate {
  key: string;
  label: string;
  type: FormFieldPropType;
  value: FormFieldValueType;

  // Number-based fields
  min?: number;
  max?: number;
  step?: number;

  // String-based fields (text, email, password, url, etc.)
  minLength?: number;
  maxLength?: number;

  // For select fields
  options?: { value: string; label: string }[];

  // Optional UI/UX-based fields
  placeholder?: string;
  required?: boolean;
}

export interface FormField {
  type: FormFieldType;
  id: string;
  name: string;
  props: FormFieldPropConfig[];
}

export interface FormData {
  title: string;
  theme: "light" | "dark";
  fields: FormField[];
}

export interface FormListItem {
  id: string;
  name: string;
}

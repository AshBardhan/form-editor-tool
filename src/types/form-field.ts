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

export type BaseFieldType = TextFieldType | InputFieldType | MediaFieldType;

export interface BaseField {
  type: BaseFieldType;
}

export type BaseFormFieldValueType =
  | string
  | number
  | boolean
  | string[]
  | undefined;

export interface FormFieldProp {
  key: string;
  label: string;
  type: "string" | "long-string" | "number" | "boolean" | "list" | "select";
  defaultValue?: BaseFormFieldValueType;
  value?: BaseFormFieldValueType;

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

export interface FormField extends BaseField {
  id: string;
  name: string;
  props: FormFieldProp[];
}

export interface FormData {
  title: string;
  theme: "light" | "dark";
  fields: FormField[];
}

export type TextFieldType = "heading" | "paragraph";
export type InputFieldType =
  | "text"
  | "number"
  | "url"
  | "email"
  | "password"
  | "textarea"
  | "checkbox";

export type BaseFieldType = TextFieldType | InputFieldType;

export interface BaseField {
  type: BaseFieldType;
}

export interface FormFieldProp {
  key: string;
  label: string;
  type: "string" | "number" | "boolean";
  defaultValue?: any;
  value?: any;

  // For number fields
  min?: number;
  max?: number;
  step?: number;

  // For string-based fields (text, email, password, url, etc.)
  minLength?: number;
  maxLength?: number;

  // Optional UI/UX helpers
  placeholder?: string;
  required?: boolean;
}

export interface FormField extends BaseField {
  id: string;
  name: string;
  props: FormFieldProp[];
}

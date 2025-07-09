export type TextFieldType = "heading" | "paragraph";
export type InputFieldType =
  | "text"
  | "number"
  | "url"
  | "email"
  | "password"
  | "textarea"
  | "checkbox"
  | "select";

export type BaseFieldType = TextFieldType | InputFieldType;

export interface BaseField {
  type: BaseFieldType;
}

export interface FormFieldProp {
  key: string;
  label: string;
  type: "string" | "number" | "boolean" | "list";
  defaultValue?: any;
  value?: any;

  // Number-based fields
  min?: number;
  max?: number;
  step?: number;

  // String-based fields (text, email, password, url, etc.)
  minLength?: number;
  maxLength?: number;

  // For select fields
  options?: string[];

  // Optional UI/UX-based fields
  placeholder?: string;
  required?: boolean;
}

export interface FormField extends BaseField {
  id: string;
  name: string;
  props: FormFieldProp[];
}

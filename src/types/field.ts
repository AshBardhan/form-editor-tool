export type TextFieldType = "heading" | "paragraph";
export type InputFieldType = "text" | "textarea" | "checkbox";
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
}

export interface FormField extends BaseField {
  id: string;
  name: string;
  props: FormFieldProp[];
}

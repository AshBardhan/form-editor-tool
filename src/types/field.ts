export type TextFieldType = "heading" | "paragraph";
export type InputFieldType = "text" | "textarea" | "checkbox";
export type FieldType = TextFieldType | InputFieldType;

export type FieldProp = {
  key: string;
  label: string;
  type: "string" | "number" | "boolean";
  defaultValue?: any;
  value?: any;
};

export type Field = {
  id: string;
  type: FieldType;
  name: string;
  props: FieldProp[];
};

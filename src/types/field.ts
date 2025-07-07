export type FieldType = "text" | "textarea" | "checkbox";

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

export type ComponentType = {
  type: FieldType;
  label: string;
};

import type { FormFieldProp, BaseFieldType } from "@/types/field";

export const fieldPropTemplates: Record<BaseFieldType, FormFieldProp[]> = {
  heading: [
    {
      key: "text",
      label: "Text",
      type: "string",
      defaultValue: "Heading Text",
    },
    { key: "level", label: "Heading Level", type: "number", defaultValue: 1 },
  ],
  paragraph: [
    {
      key: "text",
      label: "Text",
      type: "string",
      defaultValue: "Paragraph text",
    },
  ],
  text: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Text Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "Enter text",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
  textarea: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Textarea Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "Write a big text",
    },
    { key: "rows", label: "Rows", type: "number", defaultValue: 3 },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
  checkbox: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Checkbox Label",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
};

import type { FormFieldProp, BaseFieldType } from "@/types/field";

export const fieldPropTemplates: Record<BaseFieldType, FormFieldProp[]> = {
  heading: [
    {
      key: "text",
      label: "Text",
      type: "string",
      defaultValue: "Heading Text",
    },
    {
      key: "level",
      label: "Heading Level",
      type: "number",
      defaultValue: 1,
    },
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
      key: "maxLength",
      label: "Max Length",
      type: "number",
      defaultValue: 50,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
  number: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Number Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "Enter number",
    },
    {
      key: "min",
      label: "Minimum",
      type: "number",
      defaultValue: 0,
    },
    {
      key: "max",
      label: "Maximum",
      type: "number",
      defaultValue: 100,
    },
    {
      key: "step",
      label: "Step",
      type: "number",
      defaultValue: 1,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
  email: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Email Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "https://example.com",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
  ],
  password: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Password Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "Enter password",
    },
    {
      key: "minLength",
      label: "Minimum Length",
      type: "number",
      defaultValue: 6,
    },
    {
      key: "maxLength",
      label: "Maximum Length",
      type: "number",
      defaultValue: 32,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: true,
    },
  ],
  url: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "URL Field",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "https://example.com",
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
    {
      key: "rows",
      label: "Rows",
      type: "number",
      defaultValue: 3,
    },
    {
      key: "maxLength",
      label: "Max Length",
      type: "number",
      defaultValue: 300,
    },
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

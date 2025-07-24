import type { FormFieldProp, BaseFieldType } from "@/types/field";

/**
 * A record of field property templates for different base field types.
 * Each entry contains an array of form field properties with default values.
 */
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
      type: "long-string",
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
      defaultValue: "john@doe.com",
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
  radio: [
    {
      key: "alignment",
      label: "Alignment",
      type: "select",
      options: [
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
      ],
      defaultValue: "vertical",
    },
    {
      key: "options",
      label: "Options",
      type: "list",
      defaultValue: ["Radio Label 1", "Radio Label 2"],
    },
  ],
  select: [
    {
      key: "label",
      label: "Label",
      type: "string",
      defaultValue: "Select Label",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      defaultValue: "Select an option",
    },
    {
      key: "options",
      label: "Options",
      type: "list",
      defaultValue: ["Option 1", "Option 2"],
    },
  ],
  separator: [
    {
      key: "spacing",
      label: "Spacing",
      type: "number",
      defaultValue: 20,
    },
    {
      key: "divider",
      label: "Divider",
      type: "boolean",
      defaultValue: false,
    },
  ],
  button: [
    {
      key: "title",
      label: "Title",
      type: "string",
      defaultValue: "Buttton",
    },
    {
      key: "level",
      label: "Level",
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
      ],
      defaultValue: "primary",
    },
    {
      key: "position",
      label: "Position",
      type: "select",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
      defaultValue: "right",
    },
  ],
};

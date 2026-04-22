import type { FormBlockPropTemplate, FormBlockType } from "@/lib/types/form";

/**
 * A record of block property templates for different base block types.
 * Each entry contains an array of form block properties with default values.
 */
export const blockPropTemplates: Record<
  FormBlockType,
  FormBlockPropTemplate[]
> = {
  heading: [
    {
      key: "text",
      label: "Text",
      type: "string",
      value: "Heading Text",
    },
    {
      key: "level",
      label: "Heading Level",
      type: "number",
      value: 1,
    },
  ],
  paragraph: [
    {
      key: "text",
      label: "Text",
      type: "long-string",
      value: "Paragraph text",
    },
  ],
  text: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Text Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "Enter text",
    },
    {
      key: "maxLength",
      label: "Max Length",
      type: "number",
      value: 50,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
  ],
  number: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Number Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "Enter number",
    },
    {
      key: "min",
      label: "Minimum",
      type: "number",
      value: 0,
    },
    {
      key: "max",
      label: "Maximum",
      type: "number",
      value: 100,
    },
    {
      key: "step",
      label: "Step",
      type: "number",
      value: 1,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
  ],
  email: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Email Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "john@doe.com",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
  ],
  password: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Password Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "Enter password",
    },
    {
      key: "minLength",
      label: "Minimum Length",
      type: "number",
      value: 6,
    },
    {
      key: "maxLength",
      label: "Maximum Length",
      type: "number",
      value: 32,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: true,
    },
  ],
  url: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "URL Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "https://example.com",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
  ],
  textarea: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Textarea Field",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "Write a big text",
    },
    {
      key: "rows",
      label: "Rows",
      type: "number",
      value: 3,
    },
    {
      key: "maxLength",
      label: "Max Length",
      type: "number",
      value: 300,
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
  ],
  checkbox: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Checkbox Label",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
    {
      key: "grouped",
      label: "Grouped",
      type: "boolean",
      value: false,
    },
    {
      key: "options",
      label: "Options",
      type: "list",
      value: [],
    },
    {
      key: "orientation",
      label: "Orientation",
      type: "select",
      options: [
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
      ],
      value: "vertical",
    },
  ],
  radio: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
    {
      key: "orientation",
      label: "Orientation",
      type: "select",
      options: [
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
      ],
      value: "vertical",
    },
    {
      key: "options",
      label: "Options",
      type: "list",
      value: ["Radio Label 1", "Radio Label 2"],
    },
  ],
  select: [
    {
      key: "label",
      label: "Label",
      type: "string",
      value: "Select Label",
    },
    {
      key: "key",
      label: "Key",
      type: "string",
      value: "",
    },
    {
      key: "required",
      label: "Required",
      type: "boolean",
      value: false,
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "string",
      value: "Select an option",
    },
    {
      key: "options",
      label: "Options",
      type: "list",
      value: ["Option 1", "Option 2"],
    },
  ],
  separator: [
    {
      key: "spacing",
      label: "Spacing",
      type: "number",
      value: 20,
    },
    {
      key: "divider",
      label: "Divider",
      type: "boolean",
      value: false,
    },
  ],
  button: [
    {
      key: "title",
      label: "Title",
      type: "string",
      value: "Button",
    },
    {
      key: "level",
      label: "Level",
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
      ],
      value: "primary",
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
      value: "left",
    },
  ],
  buttons: [
    {
      key: "submitLabel",
      label: "Submit Button Label",
      type: "string",
      value: "Submit",
    },
    {
      key: "submitTheme",
      label: "Submit Button Theme",
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" },
        { value: "destructive", label: "Destructive" },
      ],
      value: "primary",
    },
    {
      key: "resetLabel",
      label: "Reset Button Label",
      type: "string",
      value: "Reset",
    },
    {
      key: "resetTheme",
      label: "Reset Button Theme",
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" },
        { value: "destructive", label: "Destructive" },
      ],
      value: "outline",
    },
    {
      key: "alignment",
      label: "Alignment",
      type: "select",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
        { value: "justified", label: "Justified" },
      ],
      value: "left",
    },
    {
      key: "reverse",
      label: "Reverse Order",
      type: "boolean",
      value: false,
    },
  ],
};

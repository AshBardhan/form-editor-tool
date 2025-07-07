import { ComponentCategory } from "@/types/component";

export const componentPalette: ComponentCategory[] = [
  {
    category: "text-field",
    label: "Text",
    items: [
      { type: "heading", label: "Heading" },
      //{ type: "subheading", label: "Subheading" },
      { type: "paragraph", label: "Paragraph" },
    ],
  },
  {
    category: "input-field",
    label: "Input Fields",
    items: [
      { type: "text", label: "Short Text" },
      { type: "textarea", label: "Long Text" },
      // { type: "number", label: "Number Input" },
      // { type: "url", label: "URL Input" },
      // { type: "email", label: "Email Input" },
      // { type: "password", label: "Password Input" },
      // { type: "radio", label: "Radio Group" },
      { type: "checkbox", label: "Checkbox" },
      // { type: "select", label: "Select Box" },
    ],
  },
  // {
  //   category: "action-field",
  //   label: "Control & Action",
  //   items: [
  //     { type: "button_primary", label: "Primary Button" },
  //     { type: "button_secondary", label: "Secondary Button" },
  //   ],
  // },
];

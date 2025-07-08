import { ComponentCategory } from "@/types/component";
import {
  ALargeSmall,
  AlignLeftIcon,
  Heading,
  SquareCheckBigIcon,
  TypeIcon,
} from "lucide-react";

export const componentPalette: ComponentCategory[] = [
  {
    category: "text-field",
    label: "Text",
    items: [
      { type: "heading", label: "Heading", icon: Heading },
      { type: "paragraph", label: "Paragraph", icon: ALargeSmall },
    ],
  },
  {
    category: "input-field",
    label: "Input Fields",
    items: [
      { type: "text", label: "Short Text", icon: TypeIcon },
      { type: "textarea", label: "Long Text", icon: AlignLeftIcon },
      // { type: "number", label: "Number Input" },
      // { type: "url", label: "URL Input" },
      // { type: "email", label: "Email Input" },
      // { type: "password", label: "Password Input" },
      // { type: "radio", label: "Radio Group" },
      { type: "checkbox", label: "Checkbox", icon: SquareCheckBigIcon },
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

import { ComponentCategory } from "@/types/component";
import {
  ALargeSmallIcon,
  AlignLeftIcon,
  AsteriskIcon,
  AtSignIcon,
  HashIcon,
  HeadingIcon,
  LinkIcon,
  SquareChevronDownIcon,
  MousePointerClickIcon,
  UnfoldVerticalIcon,
  SquareCheckBigIcon,
  TypeIcon,
  CircleCheckBigIcon,
} from "lucide-react";

/**
 * A list of component categories, each containing a label and items with type, label, and icon.
 */
export const componentPalette: ComponentCategory[] = [
  {
    category: "text-field",
    label: "Text",
    items: [
      { type: "heading", label: "Heading", icon: HeadingIcon },
      { type: "paragraph", label: "Paragraph", icon: ALargeSmallIcon },
      { type: "separator", label: "Separator", icon: UnfoldVerticalIcon },
    ],
  },
  {
    category: "control-field",
    label: "Media and Control",
    items: [{ type: "button", label: "Button", icon: MousePointerClickIcon }],
  },
  {
    category: "input-field",
    label: "Input Fields",
    items: [
      { type: "text", label: "Short Text", icon: TypeIcon },
      { type: "textarea", label: "Long Text", icon: AlignLeftIcon },
      { type: "number", label: "Number", icon: HashIcon },
      { type: "url", label: "Web URL", icon: LinkIcon },
      { type: "email", label: "Email", icon: AtSignIcon },
      { type: "password", label: "Password", icon: AsteriskIcon },
      { type: "radio", label: "Radio", icon: CircleCheckBigIcon },
      { type: "checkbox", label: "Checkbox", icon: SquareCheckBigIcon },
      { type: "select", label: "Select", icon: SquareChevronDownIcon },
    ],
  },
];

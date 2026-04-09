import { WidgetCategory } from "@/lib/types/widget";
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
 * A list of widget categories, each containing a label and items with type, label, and icon.
 */
export const widgetPalette: WidgetCategory[] = [
  {
    category: "text-widget",
    label: "Text",
    items: [
      { type: "heading", label: "Heading", icon: HeadingIcon },
      { type: "paragraph", label: "Paragraph", icon: ALargeSmallIcon },
      { type: "separator", label: "Separator", icon: UnfoldVerticalIcon },
    ],
  },
  {
    category: "control-widget",
    label: "Media and Control",
    items: [
      { type: "button", label: "Button", icon: MousePointerClickIcon },
      { type: "buttons", label: "Buttons", icon: MousePointerClickIcon },
    ],
  },
  {
    category: "input-widget",
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

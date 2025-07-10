import { ComponentCategory } from "@/types/component";
import {
  ALargeSmallIcon,
  AlignLeftIcon,
  AsteriskIcon,
  AtSignIcon,
  HashIcon,
  HeadingIcon,
  LinkIcon,
  ListOrderedIcon,
  MousePointerClickIcon,
  SeparatorHorizontalIcon,
  SquareCheckBigIcon,
  TypeIcon,
} from "lucide-react";

export const componentPalette: ComponentCategory[] = [
  {
    category: "text-field",
    label: "Text",
    items: [
      { type: "heading", label: "Heading", icon: HeadingIcon },
      { type: "paragraph", label: "Paragraph", icon: ALargeSmallIcon },
      { type: "separator", label: "Separator", icon: SeparatorHorizontalIcon },
    ],
  },
  {
    category: "control-field",
    label: "Mediua and Control",
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
      // { type: "radio", label: "Radio Group" },
      { type: "checkbox", label: "Checkbox", icon: SquareCheckBigIcon },
      { type: "select", label: "Option", icon: ListOrderedIcon },
    ],
  },
];

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import type { TextVariant } from "@/design-system/primitives";

export const SELECT_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export const NOTIFICATION_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push", disabled: true },
];

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived", disabled: true },
];

export const ALIGNMENT_TOGGLE_OPTIONS = [
  { value: "left", label: "Align left", icon: AlignLeft },
  { value: "center", label: "Align center", icon: AlignCenter },
  { value: "right", label: "Align right", icon: AlignRight },
];

export const DEVICE_TOGGLE_OPTIONS = [
  { value: "desktop", label: "Desktop", icon: Monitor },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "mobile", label: "Mobile", icon: Smartphone },
];

export const APP_SELECT_SIZES = ["sm", "md", "lg"] as const;
export const FORM_SELECT_SIZES = ["md", "lg"] as const;
export const APP_CHOICE_SIZES = APP_SELECT_SIZES;
export const FORM_CHOICE_SIZES = FORM_SELECT_SIZES;

export const SELECT_SIZE_LABELS = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
} as const;

export const TEXT_SAMPLES: Record<TextVariant, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  p: "Paragraph copy that uses the body font and color.",
  span: "Inline span",
  div: "Block text",
};

export type AppSelectSize = (typeof APP_SELECT_SIZES)[number];
export type FormSelectSize = (typeof FORM_SELECT_SIZES)[number];

export const INITIAL_APP_SELECT_VALUES: Record<AppSelectSize, string> = {
  sm: "draft",
  md: "review",
  lg: "published",
};

export const INITIAL_FORM_SELECT_VALUES: Record<FormSelectSize, string> = {
  md: "review",
  lg: "published",
};

import { FieldType } from "./field";
import { LucideIcon } from "lucide-react";

export type ComponentType = {
  type: FieldType;
  label: string;
  icon?: LucideIcon;
};

export interface ComponentCategory {
  category: string;
  label: string;
  items: ComponentType[];
}

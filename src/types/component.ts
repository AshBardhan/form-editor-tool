import { BaseField } from "./field";
import { LucideIcon } from "lucide-react";

export interface Component extends BaseField {
  label: string;
  icon?: LucideIcon;
}

export interface ComponentCategory {
  category: string;
  label: string;
  items: Component[];
}

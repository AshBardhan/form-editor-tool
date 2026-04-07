import { FormFieldType } from "./form.types";
import { LucideIcon } from "lucide-react";

export interface Component {
  type: FormFieldType;
  label: string;
  icon?: LucideIcon;
}

export interface ComponentCategory {
  category: string;
  label: string;
  items: Component[];
}

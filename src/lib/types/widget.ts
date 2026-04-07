import { FormBlockType } from "./form";
import { LucideIcon } from "lucide-react";

export interface Widget {
  type: FormBlockType;
  label: string;
  icon?: LucideIcon;
}

export interface WidgetCategory {
  category: string;
  label: string;
  items: Widget[];
}

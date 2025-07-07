import { FieldType } from "./field";

export type ComponentType = {
  type: FieldType;
  label: string;
};

export interface ComponentCategory {
  category: string;
  label: string;
  items: ComponentType[];
}

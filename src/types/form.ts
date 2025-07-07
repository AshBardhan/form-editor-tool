import type { Field } from "./field";

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

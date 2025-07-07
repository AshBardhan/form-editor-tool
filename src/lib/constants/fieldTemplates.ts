import type { FieldProp, FieldType } from "@/types/field";

export const fieldPropTemplates: Record<FieldType, FieldProp[]> = {
  text: [
    { key: "label", label: "Label", type: "string" },
    { key: "placeholder", label: "Placeholder", type: "string" },
    { key: "required", label: "Required", type: "boolean" },
  ],
  textarea: [
    { key: "label", label: "Label", type: "string" },
    { key: "placeholder", label: "Placeholder", type: "string" },
    { key: "rows", label: "Rows", type: "number" },
    { key: "required", label: "Required", type: "boolean" },
  ],
  checkbox: [
    { key: "label", label: "Label", type: "string" },
    { key: "required", label: "Required", type: "boolean" },
  ],
};

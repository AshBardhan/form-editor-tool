import type { FieldProp, FieldType } from "@/types/field";

export const fieldPropTemplates: Record<FieldType, FieldProp[]> = {
  text: [
    { key: "label", label: "Label", type: "string", defaultValue: "Text Field" },
    { key: "placeholder", label: "Placeholder", type: "string", defaultValue: "Enter text..." },
    { key: "required", label: "Required", type: "boolean", defaultValue: false },
  ],
  textarea: [
    { key: "label", label: "Label", type: "string", defaultValue: "Textarea Field" },
    { key: "placeholder", label: "Placeholder", type: "string", defaultValue: "Write something..." },
    { key: "rows", label: "Rows", type: "number", defaultValue: 3 },
    { key: "required", label: "Required", type: "boolean", defaultValue: false },
  ],
  checkbox: [
    { key: "label", label: "Label", type: "string", defaultValue: "Checkbox Label" },
    { key: "required", label: "Required", type: "boolean", defaultValue: false },
  ],
};

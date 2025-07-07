import { FieldProp, FieldType } from "@/types/field";
import { fieldPropTemplates } from "./fieldTemplates";

export const getDefaultProps = (fieldType: FieldType): FieldProp[] => {
  const templates = fieldPropTemplates[fieldType];

  if (!templates) return [];

  return templates.map((template) => {
    let defaultValue: any;

    switch (template.type) {
      case "boolean":
        defaultValue = false;
        break;
      case "number":
        defaultValue = 0;
        break;
      default:
        defaultValue = "";
    }

    return {
      ...template,
      value: defaultValue,
    };
  });
};

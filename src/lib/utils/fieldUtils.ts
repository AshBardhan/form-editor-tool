import { FormField, FormFieldProp, BaseFieldType } from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";
import { componentPalette } from "../constants/componentPalette";

export function getDefaultProps(type: BaseFieldType): FormFieldProp[] {
  return fieldPropTemplates[type].map((prop) => {
    let value;

    // Ensure value is initialized properly based on type
    switch (prop.type) {
      case "string":
        value = prop.defaultValue ?? "";
        break;
      case "number":
        value = prop.defaultValue ?? 0;
        break;
      case "boolean":
        value = prop.defaultValue ?? false;
        break;
      case "select":
        value = prop.options?.[0]?.value ?? prop.defaultValue;
        break;
      case "list":
        value = Array.isArray(prop.defaultValue) ? [...prop.defaultValue] : [];
        break;
      default:
        value = prop.defaultValue ?? "";
    }

    return {
      ...prop,
      value,
    };
  });
}

export function getPropValue(field: FormField, key: string) {
  return field.props.find((p) => p.key === key)?.value ?? "";
}

export function getField(type: BaseFieldType) {
  for (const group of componentPalette) {
    const item = group.items.find((f) => f.type === type);
    if (item) return item;
  }
}

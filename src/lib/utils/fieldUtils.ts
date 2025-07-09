import { FormField, FormFieldProp, BaseFieldType } from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";

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

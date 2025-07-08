import { FormField, FormFieldProp, BaseFieldType } from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";

export function getDefaultProps(type: BaseFieldType): FormFieldProp[] {
  return fieldPropTemplates[type].map((prop) => ({
    ...prop,
    value: prop.defaultValue ?? "",
  }));
}

export function getPropValue(field: FormField, key: string) {
  return field.props.find((p) => p.key === key)?.value ?? "";
}

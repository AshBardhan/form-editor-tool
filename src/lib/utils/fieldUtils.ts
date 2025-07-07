import { Field, FieldProp, FieldType } from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";

export function getDefaultProps(type: FieldType): FieldProp[] {
  return fieldPropTemplates[type].map((prop) => ({
    ...prop,
    value: prop.defaultValue ?? "",
  }));
}

export function getPropValue(field: Field, key: string) {
  return field.props.find((p) => p.key === key)?.value ?? "";
}

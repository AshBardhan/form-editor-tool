import { FieldProp, FieldType } from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";

export function getDefaultProps(type: FieldType): FieldProp[] {
  return fieldPropTemplates[type].map((prop) => ({
    ...prop,
    value: prop.defaultValue ?? "",
  }));
}

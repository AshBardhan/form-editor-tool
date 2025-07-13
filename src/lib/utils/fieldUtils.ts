import {
  FormField,
  FormFieldProp,
  BaseFieldType,
  BaseFormFieldValueType,
} from "@/types/field";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";
import { componentPalette } from "@/lib/constants/componentPalette";
import { fieldSchemas } from "@/lib/fieldSchema";

/**
 * Retrieves the default properties for a given field type.
 * @param {BaseFieldType} type - The type of the field.
 * @returns {FormFieldProp[]} An array of default properties for the field.
 */
export function getDefaultProps(type: BaseFieldType): FormFieldProp[] {
  return fieldPropTemplates[type].map((prop) => {
    let value;

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

/**
 * Retrieves the value of a specific property from a form field.
 * @param {FormField} field - The form field object.
 * @param {string} key - The key of the property to retrieve.
 * @returns {any} The value of the specified property, or an empty string if not found.
 */
export function getPropValue(
  field: FormField,
  key: string,
): BaseFormFieldValueType {
  return field.props.find((p) => p.key === key)?.value ?? "";
}

/**
 * Retrieves a field definition from the component palette by type.
 * @param {BaseFieldType} type - The type of the field to retrieve.
 * @returns {Object | undefined} The field definition including its schema, or undefined if not found.
 */
export function getField(type: BaseFieldType) {
  const groups = componentPalette.flatMap((group) => group.items);
  const item = groups.find((f) => f.type === type);
  return item ? { ...item, schema: fieldSchemas[type] ?? null } : null;
}

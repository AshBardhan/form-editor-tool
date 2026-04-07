import {
  FormField,
  FormFieldPropConfig,
  FormFieldType,
  FormFieldValueType,
} from "@/types/form.types";
import { fieldPropTemplates } from "@/lib/constants/fieldTemplates";
import { componentPalette } from "@/lib/constants/componentPalette";
import { fieldSchemas } from "@/lib/schema/fieldSchema";

/**
 * Retrieves the default properties for a given field type.
 * @param {FormFieldType} type - The type of the field.
 * @returns {FormFieldPropConfig[]} An array of default properties for the field.
 */
export function getDefaultProps(type: FormFieldType): FormFieldPropConfig[] {
  return fieldPropTemplates[type].map((prop) => {
    let value;

    switch (prop.type) {
      case "number":
        value = prop.value ?? 0;
        break;
      case "boolean":
        value = prop.value ?? false;
        break;
      case "select":
        value = prop.value ?? prop.options?.[0]?.value ?? "";
        break;
      case "list":
        value = prop.value ?? [];
        break;
      default:
        value = prop.value ?? "";
    }

    const { options: _options, ...rest } = prop;

    return {
      ...rest,
      value,
    };
  });
}

/**
 * Retrieves the value of a specific property from a form field.
 * @param {FormField} field - The form field object.
 * @param {string} key - The key of the property to retrieve.
 * @returns {FormFieldValueType} The value of the specified property, or an empty string if not found.
 */
export function getPropValue(
  field: FormField,
  key: string,
): FormFieldValueType {
  return field.props.find((p) => p.key === key)?.value ?? "";
}

/**
 * Retrieves a field definition from the component palette by type.
 * @param {FormFieldType} type - The type of the field to retrieve.
 * @returns {Object | null} The field definition including its schema, or null if not found.
 */
export function getField(type: FormFieldType) {
  const groups = componentPalette.flatMap((group) => group.items);
  const item = groups.find((f) => f.type === type);
  return item ? { ...item, schema: fieldSchemas[type] ?? null } : null;
}

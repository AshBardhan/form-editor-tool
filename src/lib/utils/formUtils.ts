import {
  FormBlock,
  FormBlockPropConfig,
  FormBlockType,
  FormBlockValueType,
} from "@/lib/types/form";
import { blockPropTemplates } from "@/lib/constants/widgetTemplates";
import { widgetPalette } from "@/lib/constants/widgetPalette";
import { formBlockSchemas } from "@/lib/schema/formBlockSchema";

/**
 * Retrieves the default properties for a given block type.
 * @param {FormBlockType} type - The type of the block.
 * @returns {FormBlockPropConfig[]} An array of default properties for the block.
 */
export function getDefaultProps(type: FormBlockType): FormBlockPropConfig[] {
  return blockPropTemplates[type].map((prop) => {
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
 * Retrieves the value of a specific property from a form block.
 * @param {FormBlock} block - The form block object.
 * @param {string} key - The key of the property to retrieve.
 * @returns {FormBlockValueType} The value of the specified property, or an empty string if not found.
 */
export function getPropValue(
  block: FormBlock,
  key: string,
): FormBlockValueType {
  return block.props.find((p) => p.key === key)?.value ?? "";
}

/**
 * Retrieves a form block definition from the widget palette by type.
 * @param {FormBlockType} type - The type of the form block to retrieve.
 * @returns {Object | null} The form block definition including its schema, or null if not found.
 */
export function getFormBlock(type: FormBlockType) {
  const groups = widgetPalette.flatMap((group) => group.items);
  const item = groups.find((b) => b.type === type);
  return item ? { ...item, schema: formBlockSchemas[type] ?? null } : null;
}

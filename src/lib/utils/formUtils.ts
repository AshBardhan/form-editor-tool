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
 * Converts a string to kebab-case.
 * @param {string} str - The string to convert.
 * @returns {string} The kebab-cased string.
 */
export function toKebabCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generates a unique key based on a label and existing blocks.
 * Ensures uniqueness by appending a number if the key already exists.
 * @param {string} label - The label to convert to a key.
 * @param {FormBlock[]} existingBlocks - Array of existing form blocks.
 * @param {string} currentBlockId - ID of the current block (to exclude from uniqueness check).
 * @returns {string} A unique key in kebab-case.
 */
export function generateUniqueKey(
  label: string,
  existingBlocks: FormBlock[],
  currentBlockId?: string,
): string {
  const baseKey = toKebabCase(label);
  
  // Get all existing keys except the current block
  const existingKeys = existingBlocks
    .filter((b) => b.id !== currentBlockId)
    .map((b) => getPropValue(b, "key") as string)
    .filter(Boolean);

  // If base key doesn't exist, use it
  if (!existingKeys.includes(baseKey)) {
    return baseKey;
  }

  // Otherwise, append a number to make it unique
  let counter = 1;
  let uniqueKey = `${baseKey}-${counter}`;
  while (existingKeys.includes(uniqueKey)) {
    counter++;
    uniqueKey = `${baseKey}-${counter}`;
  }

  return uniqueKey;
}

/**
 * Derives a key from a form block.
 * Uses the stored key if available, otherwise falls back to type-id.
 * @param {FormBlock} block - The form block.
 * @returns {string} The key in kebab-case.
 */
export function getFieldKey(block: FormBlock): string {
  const key = getPropValue(block, "key");
  if (key && typeof key === "string" && key.trim()) {
    return key;
  }
  // Fallback: use type and first 8 chars of id
  return `${block.type}-${block.id.substring(0, 8)}`;
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

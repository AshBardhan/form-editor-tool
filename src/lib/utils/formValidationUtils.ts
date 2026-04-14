import { FormBlock, FormBlockValueType } from "@/lib/types/form";
import { getPropValue } from "./formUtils";

/**
 * List of form block types that require validation
 */
const INPUT_BLOCK_TYPES = [
  "text",
  "number",
  "email",
  "password",
  "url",
  "textarea",
  "checkbox",
  "select",
  "radio",
] as const;

/**
 * Validates a single form block against its value
 *
 * @param {FormBlock} block - The form block to validate.
 * @param {FormBlockValueType | undefined} value - The current value of the field.
 * @returns {string[]} Array of error messages (empty if valid).
 */
export const validateFormBlock = (
  block: FormBlock,
  value: FormBlockValueType | undefined,
): string[] => {
  const errors: string[] = [];
  const required = getPropValue(block, "required");
  const label = getPropValue(block, "label") || block.name;

  // Skip non-input blocks (heading, paragraph, separator, button, buttons)
  if (!INPUT_BLOCK_TYPES.includes(block.type as any)) {
    return errors;
  }

  // Required field validation
  if (required) {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors.push(`${label} is required`);
    }
  }

  // Type-specific validation (only if value exists)
  if (value !== undefined && value !== null && value !== "") {
    const stringValue = String(value);

    switch (block.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(stringValue)) {
          errors.push(`${label} must be a valid email address`);
        }
        break;

      case "url":
        try {
          new URL(stringValue);
        } catch {
          errors.push(`${label} must be a valid URL`);
        }
        break;

      case "number":
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors.push(`${label} must be a valid number`);
        }
        break;
    }

    // Length validation for text-based fields
    if (["text", "email", "password", "url", "textarea"].includes(block.type)) {
      const minLength = getPropValue(block, "minLength");
      const maxLength = getPropValue(block, "maxLength");

      if (
        minLength &&
        typeof minLength === "number" &&
        stringValue.length < minLength
      ) {
        errors.push(`${label} must be at least ${minLength} characters`);
      }

      if (
        maxLength &&
        typeof maxLength === "number" &&
        stringValue.length > maxLength
      ) {
        errors.push(`${label} must be at most ${maxLength} characters`);
      }
    }

    // Min/max validation for number fields
    if (block.type === "number") {
      const min = getPropValue(block, "min");
      const max = getPropValue(block, "max");
      const numValue = Number(value);

      if (min && typeof min === "number" && numValue < min) {
        errors.push(`${label} must be at least ${min}`);
      }

      if (max && typeof max === "number" && numValue > max) {
        errors.push(`${label} must be at most ${max}`);
      }
    }
  }

  return errors;
};

/**
 * Check if a block type is an input block that requires validation
 *
 * @param {string} blockType - The block type to check.
 * @returns {boolean} True if the block type is an input block.
 */
export const isInputBlockType = (blockType: string): boolean => {
  return INPUT_BLOCK_TYPES.includes(blockType as any);
};

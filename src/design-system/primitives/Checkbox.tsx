"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

/**
 * Checkbox Primitive
 *
 * Base checkbox using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-disabled: Set when checkbox is disabled
 * - data-invalid: Set when checkbox has validation error
 * - data-checked: Set when checkbox is checked
 */
export function Checkbox({
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...props}
    />
  );
}

"use client";

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";

/**
 * CheckboxGroup Primitive
 *
 * Shared state for a series of checkboxes.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-disabled: Set when the group is disabled
 * - data-invalid: Set when the group has a validation error
 */
export function CheckboxGroup({
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: BaseCheckboxGroup.Props) {
  return (
    <BaseCheckboxGroup
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...props}
    />
  );
}

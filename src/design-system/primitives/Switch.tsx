"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";

/**
 * Switch Primitive
 *
 * Toggle switch using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-disabled: Set when switch is disabled
 * - data-invalid: Set when switch has validation error
 * - data-checked: Set when switch is toggled on
 */
export function Switch({ ...props }) {
  const { disabled, "aria-invalid": ariaInvalid, ...rest } = props;

  return (
    <BaseSwitch.Root
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...rest}
    />
  );
}

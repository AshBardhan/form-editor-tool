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
export function Switch({
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...props}
    />
  );
}

/**
 * SwitchThumb Primitive
 *
 * Movable mark that indicates whether the switch is on or off.
 * Zero styling - all appearance delegated to derived components.
 */
export function SwitchThumb({ ...props }: BaseSwitch.Thumb.Props) {
  return <BaseSwitch.Thumb data-slot="switch-thumb" {...props} />;
}

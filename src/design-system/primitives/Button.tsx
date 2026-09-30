"use client";

import { Button as BaseButton } from "@base-ui/react/button";

/**
 * Button Primitive
 *
 * Base button using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-disabled: Set when button is disabled
 */
export function Button({
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <BaseButton
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

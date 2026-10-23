"use client";

import type { LabelHTMLAttributes } from "react";

/**
 * Label Primitive
 *
 * Native label with state attributes.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-required: Set when the label marks a required field
 * - data-invalid: Set when the associated control has a validation error
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: LabelProps) {
  return (
    <label
      aria-invalid={ariaInvalid}
      data-required={required || undefined}
      data-invalid={ariaInvalid || undefined}
      {...props}
    />
  );
}

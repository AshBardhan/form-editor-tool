"use client";

/**
 * Input Primitive
 *
 * Base text input using native HTML with state attributes.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-invalid: Set when input has validation error
 * - data-disabled: Set when input is disabled
 */
export function Input({
  type,
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-invalid={ariaInvalid || undefined}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

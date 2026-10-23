"use client";

/**
 * TextArea Primitive
 *
 * Multi-line text input using native HTML with state attributes.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-invalid: Set when textarea has validation error
 * - data-disabled: Set when textarea is disabled
 */
export function TextArea({
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-invalid={ariaInvalid || undefined}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

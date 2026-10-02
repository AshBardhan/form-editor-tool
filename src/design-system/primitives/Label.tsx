"use client";

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
export function Label({
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
}) {
  return (
    <label
      aria-invalid={ariaInvalid}
      data-required={required || undefined}
      data-invalid={ariaInvalid || undefined}
      {...props}
    />
  );
}

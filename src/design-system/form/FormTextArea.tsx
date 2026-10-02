import { ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";
import { TextArea } from "@/design-system/primitives";

export function FormTextArea({
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: ComponentProps<"textarea"> & {}) {
  const textareaClassName = cn(
    "w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-form-field-placeholder",
    "focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-form-field-border bg-form-field text-form-fg rounded-md p-3 resize-vertical min-h-24",
    {
      "border-form-error focus-visible:ring-form-error/30 data-[invalid]:border-form-error data-[invalid]:focus-visible:ring-form-error/30":
        ariaInvalid,
      "border-form-field-border focus-visible:ring-form-brand/30":
        !ariaInvalid,
      "hover:border-form-border-strong": !disabled && !ariaInvalid,
    },
    className,
  );

  return (
    <TextArea
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-slot="form-textarea"
      className={textareaClassName}
      {...props}
    />
  );
}

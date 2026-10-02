import { ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";
import { TextArea } from "@/design-system/primitives";

export function AppTextArea({
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: ComponentProps<"textarea"> & {}) {
  const textareaClassName = cn(
    "w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed [&::placeholder]:text-app-fg-muted",
    "focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-app-border-subtle bg-app-surface text-app-fg rounded-md px-3 py-2 text-sm leading-5 resize-vertical min-h-24",
    {
      "border-app-error focus-visible:ring-app-error/30 data-[invalid]:border-app-error data-[invalid]:focus-visible:ring-app-error/30":
        ariaInvalid,
      "border-app-border-subtle focus-visible:ring-app-brand/30": !ariaInvalid,
      "hover:border-app-border-strong": !disabled && !ariaInvalid,
    },
    className,
  );

  return (
    <TextArea
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-slot="app-textarea"
      className={textareaClassName}
      {...props}
    />
  );
}

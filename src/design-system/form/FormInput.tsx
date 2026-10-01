import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Input } from "@/design-system/primitives";

const inputVariants = cva(
  "w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed [&::placeholder]:text-form-fg-muted focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-form-border-subtle bg-form-surface text-form-fg rounded-md",
  {
    variants: {
      inputSize: {
        sm: "h-8 px-3 py-1.5 text-sm",
        md: "h-9 px-4 py-2 text-sm",
        lg: "h-10 px-4 py-2.5 text-base",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

export function FormInput({
  className,
  inputSize,
  type = "text",
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  const inputClassName = cn(inputVariants({ inputSize, className }), {
    "border-form-error focus-visible:ring-form-error/30 data-[invalid]:border-form-error data-[invalid]:focus-visible:ring-form-error/30":
      ariaInvalid,
    "border-form-border-subtle focus-visible:ring-form-brand/30": !ariaInvalid,
    "hover:border-form-border-strong": !disabled && !ariaInvalid,
  });

  return (
    <Input
      type={type}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-slot="form-input"
      className={inputClassName}
      {...props}
    />
  );
}

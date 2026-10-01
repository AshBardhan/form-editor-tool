import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Input } from "@/design-system/primitives";

const inputVariants = cva(
  "w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed [&::placeholder]:text-app-fg-muted focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-app-border-subtle bg-app-surface text-app-fg rounded-md",
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

export function AppInput({
  className,
  inputSize,
  type = "text",
  disabled,
  "aria-invalid": ariaInvalid,
  ...props
}: ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  const inputClassName = cn(inputVariants({ inputSize, className }), {
    "border-app-error focus-visible:ring-app-error/30 data-[invalid]:border-app-error data-[invalid]:focus-visible:ring-app-error/30":
      ariaInvalid,
    "border-app-border-subtle focus-visible:ring-app-brand/30": !ariaInvalid,
    "hover:border-app-border-strong": !disabled && !ariaInvalid,
  });

  return (
    <Input
      type={type}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-slot="app-input"
      className={inputClassName}
      {...props}
    />
  );
}

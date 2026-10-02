import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Label } from "@/design-system/primitives";

const labelVariants = cva(
  "inline-flex items-center gap-1 font-medium text-form-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-form-error",
  {
    variants: {
      size: {
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export function FormLabel({
  className,
  size,
  required,
  children,
  ...props
}: ComponentProps<"label"> &
  VariantProps<typeof labelVariants> & {
    required?: boolean;
  }) {
  return (
    <Label
      required={required}
      data-slot="form-label"
      className={cn(labelVariants({ size, className }))}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-form-error">
          *
        </span>
      ) : null}
    </Label>
  );
}

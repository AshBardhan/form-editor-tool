import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Label } from "@/design-system/primitives";

const labelVariants = cva(
  "inline-flex items-center font-medium text-form-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-form-error",
  {
    variants: {
      size: {
        md: "gap-1 text-sm leading-5",
        lg: "gap-1.5 text-lg leading-6",
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

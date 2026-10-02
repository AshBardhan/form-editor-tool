import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Label } from "@/design-system/primitives";

const labelVariants = cva(
  "inline-flex items-center font-medium text-app-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-app-error",
  {
    variants: {
      size: {
        sm: "gap-1 text-xs leading-4",
        md: "gap-1 text-sm leading-5",
        lg: "gap-1.5 text-lg leading-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export function AppLabel({
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
      data-slot="app-label"
      className={cn(labelVariants({ size, className }))}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-app-error">
          *
        </span>
      ) : null}
    </Label>
  );
}

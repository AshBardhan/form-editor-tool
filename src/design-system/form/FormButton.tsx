import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Button } from "@/design-system/primitives";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        solid: "rounded-md border shadow-xs",
        outline: "rounded-md border bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
      },
      size: {
        md: "h-8 px-3 py-1 text-sm leading-5 gap-1.5 [&_svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2.5",
        lg: "h-10 px-4 py-2 text-base leading-6 gap-2 [&_svg:not([class*='size-'])]:size-4.5 has-[>svg]:px-4",
      },
    },
    compoundVariants: [
      // Solid + Primary
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-form-brand border-form-brand text-form-fg-on-brand hover:bg-form-brand-hover hover:border-form-brand-hover focus-visible:ring-form-brand/30 active:opacity-90",
      },
      // Outline + Primary
      {
        variant: "outline",
        color: "primary",
        className:
          "border-form-brand text-form-brand hover:bg-form-brand/10 focus-visible:ring-form-brand/30",
      },

      // Solid + Secondary
      {
        variant: "solid",
        color: "secondary",
        className:
          "bg-form-surface-muted border-form-border-subtle text-form-fg hover:bg-form-border-subtle hover:border-form-border-strong focus-visible:ring-form-border-strong/30 active:opacity-90",
      },
      // Outline + Secondary
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-form-border-subtle text-form-fg hover:bg-form-surface-muted focus-visible:ring-form-border-strong/30",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "primary",
    },
  },
);

export function FormButton({
  className,
  variant,
  size,
  color,
  type = "button",
  children,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  const buttonClassName = cn(
    buttonVariants({ variant, size, color, className }),
  );

  return (
    <Button
      type={type}
      data-slot="form-button"
      className={buttonClassName}
      {...props}
    >
      {children}
    </Button>
  );
}

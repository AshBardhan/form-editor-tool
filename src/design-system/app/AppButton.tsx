import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Button } from "@/design-system/primitives";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        solid: "rounded-md border shadow-xs",
        outline: "rounded-md border bg-transparent",
        ghost: "rounded-md bg-transparent border-0",
        link: "p-0 h-auto rounded-none border-0 underline-offset-4",
      },
      color: {
        primary: "",
        secondary: "",
        positive: "",
        negative: "",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-sm gap-1.5 has-[>svg]:px-2",
        md: "h-9 px-4 py-2 text-sm has-[>svg]:px-3",
        lg: "h-10 px-6 py-2.5 text-base has-[>svg]:px-4",
      },
    },
    compoundVariants: [
      // Solid + Primary
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-app-brand border-app-brand text-white hover:bg-app-brand-hover hover:border-app-brand-hover focus-visible:ring-app-brand/30 active:opacity-90",
      },
      // Outline + Primary
      {
        variant: "outline",
        color: "primary",
        className:
          "border-app-brand text-app-brand hover:bg-app-brand/10 focus-visible:ring-app-brand/30",
      },
      // Ghost + Primary
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-app-brand hover:bg-app-brand/10 focus-visible:ring-app-brand/30",
      },
      // Link + Primary
      {
        variant: "link",
        color: "primary",
        className:
          "text-app-brand hover:underline focus-visible:ring-app-brand/30",
      },

      // Solid + Secondary
      {
        variant: "solid",
        color: "secondary",
        className:
          "bg-app-surface-muted border-app-border-subtle text-app-fg hover:bg-app-border-subtle hover:border-app-border-strong focus-visible:ring-app-border-strong/30 active:opacity-90",
      },
      // Outline + Secondary
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-app-border-subtle text-app-fg hover:bg-app-surface-muted focus-visible:ring-app-border-strong/30",
      },
      // Ghost + Secondary
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-app-fg hover:bg-app-surface-muted focus-visible:ring-app-border-strong/30",
      },
      // Link + Secondary
      {
        variant: "link",
        color: "secondary",
        className:
          "text-app-fg hover:underline focus-visible:ring-app-border-strong/30",
      },

      // Solid + Positive
      {
        variant: "solid",
        color: "positive",
        className:
          "bg-app-success border-app-success text-white hover:opacity-90 focus-visible:ring-app-success/30 active:opacity-80",
      },
      // Outline + Positive
      {
        variant: "outline",
        color: "positive",
        className:
          "border-app-success text-app-success hover:bg-app-success/10 focus-visible:ring-app-success/30",
      },
      // Ghost + Positive
      {
        variant: "ghost",
        color: "positive",
        className:
          "text-app-success hover:bg-app-success/10 focus-visible:ring-app-success/30",
      },
      // Link + Positive
      {
        variant: "link",
        color: "positive",
        className:
          "text-app-success hover:underline focus-visible:ring-app-success/30",
      },

      // Solid + Negative
      {
        variant: "solid",
        color: "negative",
        className:
          "bg-app-error border-app-error text-white hover:opacity-90 focus-visible:ring-app-error/30 active:opacity-80",
      },
      // Outline + Negative
      {
        variant: "outline",
        color: "negative",
        className:
          "border-app-error text-app-error hover:bg-app-error/10 focus-visible:ring-app-error/30",
      },
      // Ghost + Negative
      {
        variant: "ghost",
        color: "negative",
        className:
          "text-app-error hover:bg-app-error/10 focus-visible:ring-app-error/30",
      },
      // Link + Negative
      {
        variant: "link",
        color: "negative",
        className:
          "text-app-error hover:underline focus-visible:ring-app-error/30",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "primary",
    },
  },
);

export function AppButton({
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
      data-slot="app-button"
      className={buttonClassName}
      {...props}
    >
      {children}
    </Button>
  );
}

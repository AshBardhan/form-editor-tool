import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Text, type TextVariant } from "@/design-system/primitives";

/**
 * Form text scale. Sizes follow the nearest container (`@sm`, `@5xl`),
 * so type grows with the form column rather than the viewport.
 * Headings use the form heading font and heading color; body uses the form body font.
 */
const textVariants = cva("", {
  variants: {
    variant: {
      h1: "font-form-heading text-form-fg-heading text-2xl font-bold @sm:text-3xl @5xl:text-4xl",
      h2: "font-form-heading text-form-fg-heading text-xl font-bold @sm:text-2xl @5xl:text-3xl",
      h3: "font-form-heading text-form-fg-heading text-lg font-semibold @sm:text-xl @5xl:text-2xl",
      h4: "font-form-heading text-form-fg-heading text-base font-semibold @sm:text-lg @5xl:text-xl",
      h5: "font-form-heading text-form-fg-heading text-sm font-medium @sm:text-base @5xl:text-lg",
      h6: "font-form-heading text-form-fg-heading text-xs font-medium @sm:text-sm @5xl:text-base",
      p: "font-form-body text-form-fg text-sm @sm:text-base @5xl:text-base",
      span: "font-form-body text-form-fg text-sm @sm:text-base @5xl:text-base",
      div: "font-form-body text-form-fg text-sm @sm:text-base @5xl:text-base",
    },
  },
  defaultVariants: {
    variant: "div",
  },
});

export function FormText({
  className,
  variant = "div",
  ...props
}: Omit<ComponentProps<typeof Text>, "variant"> &
  VariantProps<typeof textVariants> & {
    variant?: TextVariant;
  }) {
  return (
    <Text
      variant={variant}
      data-slot="form-text"
      className={cn(textVariants({ variant, className }))}
      {...props}
    />
  );
}

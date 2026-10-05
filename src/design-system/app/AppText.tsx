import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import { Text, type TextVariant } from "@/design-system/primitives";

/**
 * App text scale. Sizes follow the viewport (`sm`, `2xl`).
 * Headings use the app heading font and heading color; body uses the app body font.
 */
const textVariants = cva("", {
  variants: {
    variant: {
      h1: "font-app-heading text-app-fg-heading text-2xl font-bold sm:text-3xl 2xl:text-4xl",
      h2: "font-app-heading text-app-fg-heading text-xl font-bold sm:text-2xl 2xl:text-3xl",
      h3: "font-app-heading text-app-fg-heading text-lg font-semibold sm:text-xl 2xl:text-2xl",
      h4: "font-app-heading text-app-fg-heading text-base font-semibold sm:text-lg 2xl:text-xl",
      h5: "font-app-heading text-app-fg-heading text-sm font-medium sm:text-base 2xl:text-lg",
      h6: "font-app-heading text-app-fg-heading text-xs font-medium sm:text-sm 2xl:text-base",
      p: "font-app-body text-app-fg text-sm sm:text-base 2xl:text-base",
      span: "font-app-body text-app-fg text-sm sm:text-base 2xl:text-base",
      div: "font-app-body text-app-fg text-sm sm:text-base 2xl:text-base",
    },
  },
  defaultVariants: {
    variant: "div",
  },
});

export function AppText({
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
      data-slot="app-text"
      className={cn(textVariants({ variant, className }))}
      {...props}
    />
  );
}

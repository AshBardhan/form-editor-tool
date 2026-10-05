"use client";

import type { ElementType, HTMLAttributes } from "react";

/**
 * Text Primitive
 *
 * Polymorphic text element. `variant` selects the rendered tag.
 * Zero styling — appearance is delegated to derived components.
 */
export const TEXT_VARIANTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "div",
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];

export function Text({
  variant = "div",
  ...props
}: HTMLAttributes<HTMLElement> & {
  variant?: TextVariant;
}) {
  const Component = variant as ElementType;
  return <Component {...props} />;
}

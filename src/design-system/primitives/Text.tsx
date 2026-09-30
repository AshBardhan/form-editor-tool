"use client";

import type { ElementType } from "react";

/**
 * Text Primitive
 *
 * Polymorphic text element that renders as any text-based HTML tag.
 * Zero styling - all appearance delegated to derived components.
 *
 * Supports semantic HTML with 'as' or 'variant' prop.
 */
export function Text({
  variant = "p",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  variant?: string;
}) {
  const Component = variant as ElementType;
  return <Component {...props} />;
}

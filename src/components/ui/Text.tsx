"use client";

import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  className?: string;
  children: ReactNode;
  insideFormContainer?: boolean;
}

const variantClasses = {
  h1: {
    container: "text-2xl @sm:text-3xl @5xl:text-4xl font-bold",
    viewport: "text-2xl sm:text-3xl 2xl:text-4xl font-bold",
  },
  h2: {
    container: "text-xl @sm:text-2xl @5xl:text-3xl font-bold",
    viewport: "text-xl sm:text-2xl 2xl:text-3xl font-bold",
  },
  h3: {
    container: "text-lg @sm:text-xl @5xl:text-2xl font-semibold",
    viewport: "text-lg sm:text-xl 2xl:text-2xl font-semibold",
  },
  h4: {
    container: "text-base @sm:text-lg @5xl:text-xl font-semibold",
    viewport: "text-base sm:text-lg 2xl:text-xl font-semibold",
  },
  h5: {
    container: "text-sm @sm:text-base @5xl:text-lg font-medium",
    viewport: "text-sm sm:text-base 2xl:text-lg font-medium",
  },
  h6: {
    container: "text-xs @sm:text-sm @5xl:text-base font-medium",
    viewport: "text-xs sm:text-sm 2xl:text-base font-medium",
  },
  p: {
    container: "text-sm @sm:text-base @5xl:text-base",
    viewport: "text-sm sm:text-base 2xl:text-base",
  },
  div: {
    container: "text-sm @sm:text-base @5xl:text-base",
    viewport: "text-sm sm:text-base 2xl:text-base",
  },
};

const Text = ({
  variant = "div",
  className = "",
  children,
  insideFormContainer = false,
  ...props
}: TextProps) => {
  const Component = variant as ElementType;
  const responsiveClass =
    variantClasses[variant][insideFormContainer ? "container" : "viewport"];

  return (
    <Component className={cn(responsiveClass, className)} {...props}>
      {children}
    </Component>
  );
};

export default Text;

"use client";

import { ReactNode, ElementType } from "react";
import clsx from "clsx";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  className?: string;
  children: ReactNode;
}

const Text = ({
  variant = "div",
  className = "",
  children,
  ...props
}: TextProps) => {
  const Component = variant as ElementType;

  return (
    <Component
      className={clsx(
        variant === "h1" && "text-2xl sm:text-3xl font-bold",
        variant === "h2" && "text-xl sm:text-2xl font-bold",
        variant === "h3" && "text-lg sm:text-xl font-semibold",
        variant === "h4" && "text-base sm:text-lg font-semibold",
        variant === "h5" && "text-sm sm:text-base font-medium",
        variant === "h6" && "text-xs sm:text-sm font-medium",
        variant === "p" && "text-sm sm:text-base",
        variant === "div" && "text-sm sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;

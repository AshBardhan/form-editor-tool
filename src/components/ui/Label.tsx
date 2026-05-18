"use client";

import { type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

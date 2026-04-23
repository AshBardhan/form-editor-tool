"use client";

import * as React from "react";
import { cn } from "@/lib/utils/styleUtils";
import { FormBlockOrientation } from "@/lib/types/form";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: FormBlockOrientation;
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="separator"
        data-orientation={orientation}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "bg-border shrink-0",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator };

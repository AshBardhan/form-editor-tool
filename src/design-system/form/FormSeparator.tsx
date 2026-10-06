import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/styleUtils";

export type FormSeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function FormSeparator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: FormSeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-slot="form-separator"
      data-orientation={orientation}
      className={cn(
        "bg-form-border-subtle shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

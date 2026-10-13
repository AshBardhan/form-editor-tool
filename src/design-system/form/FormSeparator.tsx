import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";
import { Separator } from "@/design-system/primitives/Separator";

export interface FormSeparatorProps extends ComponentProps<typeof Separator> {
  decorative?: boolean;
}

export function FormSeparator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: FormSeparatorProps) {
  return (
    <Separator
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      orientation={orientation}
      data-slot="form-separator"
      data-orientation={orientation}
      className={cn(
        "bg-form-border-subtle shrink-0",
        orientation === "horizontal" ? "h-px" : "w-px",
        className,
      )}
      {...props}
    />
  );
}

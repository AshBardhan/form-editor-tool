import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";
import { Separator } from "@/design-system/primitives/Separator";

export interface AppSeparatorProps extends ComponentProps<typeof Separator> {
  decorative?: boolean;
}

export function AppSeparator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: AppSeparatorProps) {
  return (
    <Separator
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      orientation={orientation}
      data-slot="app-separator"
      data-orientation={orientation}
      className={cn(
        "bg-app-border-subtle shrink-0",
        orientation === "horizontal" ? "h-px" : "w-px",
        className,
      )}
      {...props}
    />
  );
}

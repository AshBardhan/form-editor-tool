"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface AppCardProps extends ComponentProps<"div"> {
  clickable?: boolean;
}

export function AppCard({
  className,
  clickable = false,
  ...props
}: AppCardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "block p-6 bg-app-surface border border-app-border-subtle rounded-lg shadow transition-colors duration-200",
        clickable &&
          "hover:bg-app-surface-hover hover:shadow-md cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

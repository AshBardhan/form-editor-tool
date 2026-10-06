import type { ComponentProps, ReactNode } from "react";
import type { FormTheme } from "@/lib/types/themes";
import { cn } from "@/lib/utils/styleUtils";

interface FormThemeContainerProps {
  theme: FormTheme;
  className?: string;
  children: ReactNode;
}

export function FormThemeContainer({
  theme,
  className,
  children,
  ...props
}: ComponentProps<"div"> & FormThemeContainerProps) {
  return (
    <div
      data-form-theme={theme}
      className={cn("form-container", className)}
      {...props}
    >
      {children}
    </div>
  );
}

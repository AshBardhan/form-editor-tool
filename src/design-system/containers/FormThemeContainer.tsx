import type { ComponentProps } from "react";
import type { FormTheme } from "@/lib/types/themes";
import { cn } from "@/lib/utils/styleUtils";

interface FormThemeContainerProps extends ComponentProps<"div"> {
  theme: FormTheme;
}

export function FormThemeContainer({
  theme,
  className,
  children,
  ...props
}: FormThemeContainerProps) {
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

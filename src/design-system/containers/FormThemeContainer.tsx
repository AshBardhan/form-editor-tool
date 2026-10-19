import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/styleUtils";
import { resolveFormTheme } from "@/lib/utils/themeUtils";
import type { FormTheme } from "@/lib/types/themes";

interface FormThemeContainerProps extends ComponentProps<"div"> {
  theme: FormTheme;
  isEmpty?: boolean;
}

export function FormThemeContainer({
  theme,
  isEmpty = false,
  className,
  children,
  ...props
}: FormThemeContainerProps) {
  const resolvedTheme = resolveFormTheme(theme);

  return (
    <div
      data-form-theme={resolvedTheme}
      className={cn(!isEmpty && "form-container", className)}
      {...props}
    >
      {children}
    </div>
  );
}

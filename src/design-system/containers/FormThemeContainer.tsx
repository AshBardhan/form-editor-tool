import type { ReactNode } from "react";
import { FormTheme } from "@/lib/types/form";

interface FormThemeContainerProps {
  theme: FormTheme;
  children: ReactNode;
}

export function FormThemeContainer({
  theme,
  children,
}: FormThemeContainerProps) {
  return (
    <div data-form-theme={theme} className="form-container">
      {children}
    </div>
  );
}

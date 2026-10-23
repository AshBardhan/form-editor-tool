import { DEFAULT_FORM_THEME, FORM_THEMES } from "@/lib/constants/themes";
import type { FormTheme } from "@/lib/types/themes";

export function isFormTheme(value: unknown): value is FormTheme {
  return (
    typeof value === "string" &&
    (FORM_THEMES as readonly string[]).includes(value)
  );
}

export function resolveFormTheme(value: unknown): FormTheme {
  return isFormTheme(value) ? value : DEFAULT_FORM_THEME;
}

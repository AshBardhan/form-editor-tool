import { FORM_THEMES } from "@/lib/constants/themes";
import { FormTheme } from "@/lib/types/themes";

export function isFormTheme(value: FormTheme): boolean {
  return FORM_THEMES.includes(value);
}

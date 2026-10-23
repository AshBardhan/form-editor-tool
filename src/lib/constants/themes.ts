import type { AppTheme, FormTheme } from "@/lib/types/themes";

/**
 * Built-in theme ids. Form theme ids are persisted on Form.theme; renaming or
 * removing one requires a Prisma enum migration.
 */
export const APP_THEMES = [
  "light",
  "dark",
] as const satisfies readonly AppTheme[];
export const FORM_THEMES = [
  "light",
  "dark",
  "forest",
  "beach",
  "frost",
  "fire",
] as const satisfies readonly FormTheme[];

export const DEFAULT_APP_THEME: AppTheme = "light";
export const DEFAULT_FORM_THEME: FormTheme = "light";

export const APP_THEME_LABELS: Record<AppTheme, string> = {
  light: "Light",
  dark: "Dark",
};

export const FORM_THEME_LABELS: Record<FormTheme, string> = {
  light: "Light",
  dark: "Dark",
  forest: "Forest",
  beach: "Beach",
  frost: "Frost",
  fire: "Fire",
};

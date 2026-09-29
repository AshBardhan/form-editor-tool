import type { AppTheme, FormTheme } from "@/lib/types/themes";

/**
 * Built-in theme ids. Form theme ids are persisted in the database; renaming or
 * removing one requires a data migration.
 */
export const APP_THEMES: AppTheme[] = ["light", "dark"];
export const FORM_THEMES: FormTheme[] = [
  "light",
  "dark",
  "forest",
  "beach",
  "frost",
  "fire",
];

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

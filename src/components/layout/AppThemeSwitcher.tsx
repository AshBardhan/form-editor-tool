"use client";

import { Moon, Sun } from "lucide-react";
import { APP_THEME_LABELS } from "@/lib/constants/themes";
import { useUIStateStore } from "@/lib/stores/UIStateStore";

export function AppThemeSwitcher() {
  const theme = useUIStateStore((state) => state.appTheme);
  const setAppTheme = useUIStateStore((state) => state.setAppTheme);
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      aria-label={`Switch to ${APP_THEME_LABELS[nextTheme]} theme`}
      title={`Switch to ${APP_THEME_LABELS[nextTheme]} theme`}
      aria-pressed={theme === "dark"}
      className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={() => setAppTheme(nextTheme)}
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}

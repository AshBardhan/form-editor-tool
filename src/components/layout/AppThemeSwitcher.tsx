"use client";

import { Moon, Sun } from "lucide-react";
import { APP_THEME_LABELS } from "@/lib/constants/themes";
import { useUIStateStore } from "@/lib/stores/UIStateStore";
import { AppButton } from "@/design-system/app/AppButton";

export function AppThemeSwitcher() {
  const theme = useUIStateStore((state) => state.appTheme);
  const setAppTheme = useUIStateStore((state) => state.setAppTheme);
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <AppButton
      variant="ghost"
      color="secondary"
      aria-label={`Switch to ${APP_THEME_LABELS[nextTheme]} theme`}
      title={`Switch to ${APP_THEME_LABELS[nextTheme]} theme`}
      aria-pressed={theme === "dark"}
      className="size-9 p-0 hover:bg-black/10"
      onClick={() => setAppTheme(nextTheme)}
    >
      <Icon aria-hidden="true" className="size-4" />
    </AppButton>
  );
}

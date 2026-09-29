"use client";

import { useEffect, HTMLAttributes, type ReactNode } from "react";
import { useUIStateStore } from "@/lib/stores/UIStateStore";

interface AppThemeContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AppThemeContainer({
  children,
  ...props
}: AppThemeContainerProps) {
  const appTheme = useUIStateStore((state) => state.appTheme);
  const initializeAppTheme = useUIStateStore(
    (state) => state.initializeAppTheme,
  );

  useEffect(() => {
    initializeAppTheme();
  }, [initializeAppTheme]);

  return (
    <div data-app-theme={appTheme} {...props}>
      {children}
    </div>
  );
}

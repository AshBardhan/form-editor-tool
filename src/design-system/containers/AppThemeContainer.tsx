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
  const hydrateAppTheme = useUIStateStore((state) => state.hydrateAppTheme);

  useEffect(() => {
    hydrateAppTheme();
  }, [hydrateAppTheme]);

  return (
    <div id="app" data-app-scope {...props}>
      {children}
    </div>
  );
}

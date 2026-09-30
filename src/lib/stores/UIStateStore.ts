import { create } from "zustand";
import { AppTheme } from "@/lib/types/themes";
import { DEFAULT_APP_THEME } from "@/lib/constants/themes";

export const APP_THEME_STORAGE_KEY = "app-theme";

interface UIStateStore {
  appTheme: AppTheme;
  isAppThemeHydrated: boolean;
  selectedFormBlockId: string | null;
  hoveredFormBlockId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  setAppTheme: (theme: AppTheme) => void;
  hydrateAppTheme: () => void;
  selectFormBlock: (id: string | null) => void;
  hoverFormBlock: (id: string | null) => void;
  toggleSidebar: (side: "left" | "right") => void;
  resetSidebar: () => void;
}

// Reads the theme applied to <html> by the inline script in the root layout.
function readClientAppTheme(): AppTheme {
  const theme = document.documentElement.dataset.appTheme;
  return theme === "light" || theme === "dark" ? theme : DEFAULT_APP_THEME;
}

/**
 * Zustand store for managing UI state of block selection and sidebar visibility.
 */
export const useUIStateStore = create<UIStateStore>((set) => ({
  // Must match the server render; the real value is synced via hydrateAppTheme after mount.
  appTheme: DEFAULT_APP_THEME,
  isAppThemeHydrated: false,
  selectedFormBlockId: null,
  hoveredFormBlockId: null,
  isSidebarCollapsed: {
    left: false,
    right: false,
  },

  setAppTheme: (theme) => {
    set({ appTheme: theme });
    document.documentElement.dataset.appTheme = theme;
    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  },

  hydrateAppTheme: () => {
    set((state) =>
      state.isAppThemeHydrated
        ? state
        : { appTheme: readClientAppTheme(), isAppThemeHydrated: true },
    );
  },

  selectFormBlock: (id) => {
    set((state) =>
      state.selectedFormBlockId === id ? state : { selectedFormBlockId: id },
    );
  },

  hoverFormBlock: (id) => {
    set((state) =>
      state.hoveredFormBlockId === id ? state : { hoveredFormBlockId: id },
    );
  },

  toggleSidebar: (side: "left" | "right") => {
    set((state) => ({
      isSidebarCollapsed: {
        ...state.isSidebarCollapsed,
        [side]: !state.isSidebarCollapsed[side],
      },
    }));
  },

  resetSidebar: () => {
    set({ isSidebarCollapsed: { left: false, right: false } });
  },
}));

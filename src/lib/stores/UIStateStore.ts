import { create } from "zustand";
import { AppTheme } from "@/lib/types/themes";
import { DEFAULT_APP_THEME } from "@/lib/constants/themes";

interface UIStateStore {
  appTheme: AppTheme;
  selectedFormBlockId: string | null;
  hoveredFormBlockId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  initializeAppTheme: () => void;
  setAppTheme: (theme: AppTheme) => void;
  selectFormBlock: (id: string | null) => void;
  hoverFormBlock: (id: string | null) => void;
  toggleSidebar: (side: "left" | "right") => void;
  resetSidebar: () => void;
}

/**
 * Zustand store for managing UI state of block selection and sidebar visibility.
 */
export const useUIStateStore = create<UIStateStore>((set) => ({
  appTheme: DEFAULT_APP_THEME,
  selectedFormBlockId: null,
  hoveredFormBlockId: null,
  isSidebarCollapsed: {
    left: false,
    right: false,
  },

  initializeAppTheme: () => {
    const storedTheme = localStorage.getItem("app-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      set({ appTheme: storedTheme });
    }
  },

  setAppTheme: (theme) => {
    set({ appTheme: theme });
    localStorage.setItem("app-theme", theme);
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

import { create } from "zustand";

/**
 * Interface representing the UI state and actions.
 * This store handles transient UI state that changes frequently.
 */
interface UIStateStore {
  selectedFieldId: string | null;
  hoveredFieldId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  selectField: (id: string | null) => void;
  hoverField: (id: string | null) => void;
  toggleSidebar: (side: "left" | "right") => void;
}

/**
 * Zustand store for managing UI state.
 * This store is separated to minimize re-renders when only UI state changes.
 * UI state changes are frequent but don't affect form data.
 */
export const useUIStateStore = create<UIStateStore>((set) => ({
  selectedFieldId: null,
  hoveredFieldId: null,
  isSidebarCollapsed: {
    left: false,
    right: false,
  },

  selectField: (id) => {
    set((state) =>
      state.selectedFieldId === id ? state : { selectedFieldId: id },
    );
  },

  hoverField: (id) => {
    set((state) =>
      state.hoveredFieldId === id ? state : { hoveredFieldId: id },
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
}));
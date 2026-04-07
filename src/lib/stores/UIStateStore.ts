import { create } from "zustand";

interface UIStateStore {
  selectedFormBlockId: string | null;
  hoveredFormBlockId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  selectFormBlock: (id: string | null) => void;
  hoverFormBlock: (id: string | null) => void;
  toggleSidebar: (side: "left" | "right") => void;
  resetSidebar: () => void;
}

/**
 * Zustand store for managing UI state of block selection and sidebar visibility.
 */
export const useUIStateStore = create<UIStateStore>((set) => ({
  selectedFormBlockId: null,
  hoveredFormBlockId: null,
  isSidebarCollapsed: {
    left: false,
    right: false,
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

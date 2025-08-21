import { create } from "zustand";

interface UIStateStore {
  loading: boolean;
  selectedFieldId: string | null;
  hoveredFieldId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  selectField: (id: string | null) => void;
  hoverField: (id: string | null) => void;
  toggleSidebar: (side: "left" | "right") => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Zustand store for managing UI state of field selection and sidebar visibility.
 */
export const useUIStateStore = create<UIStateStore>((set) => ({
  loading: false,
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
  setLoading: (loading) => set({ loading }),
}));

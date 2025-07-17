import { create } from "zustand";

/**
 * Interface representing the validation state and actions.
 * This store handles field validation errors.
 */
interface ValidationState {
  fieldErrors: Record<string, string[]>;
  setFieldErrors: (fieldId: string, errors: string[]) => void;
  clearFieldErrors: (fieldId: string) => void;
  clearAllFieldErrors: () => void;
}

/**
 * Zustand store for managing field validation errors.
 * This store is separated to minimize re-renders when only validation state changes.
 */
export const useValidationStore = create<ValidationState>((set) => ({
  fieldErrors: {},

  setFieldErrors: (fieldId, errors) =>
    set((state) => ({
      fieldErrors: { ...state.fieldErrors, [fieldId]: errors },
    })),

  clearFieldErrors: (fieldId) =>
    set((state) => {
      const updated = { ...state.fieldErrors };
      delete updated[fieldId];
      return { fieldErrors: updated };
    }),

  clearAllFieldErrors: () =>
    set(() => ({
      fieldErrors: {},
    })),
}));
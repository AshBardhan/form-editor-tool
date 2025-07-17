import { create } from "zustand";

interface FieldValidationState {
  fieldErrors: Record<string, string[]>;
  setFieldErrors: (fieldId: string, errors: string[]) => void;
  clearFieldErrors: (fieldId: string) => void;
  clearAllFieldErrors: () => void;
}

/**
 * Zustand store for managing field validation errors.
 */
export const useFieldValidationStore = create<FieldValidationState>((set) => ({
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

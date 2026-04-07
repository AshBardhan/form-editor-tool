import { create } from "zustand";

interface FormBlockValidationState {
  formBlockErrors: Record<string, string[]>;
  updateFormBlockErrors: (blockId: string, errors: string[]) => void;
  clearFormBlockErrors: (blockId: string) => void;
  clearAllFormBlockErrors: () => void;
}

/**
 * Zustand store for managing form block validation errors.
 */
export const useFormBlockValidationStore = create<FormBlockValidationState>(
  (set) => ({
    formBlockErrors: {},

    updateFormBlockErrors: (blockId, errors) =>
      set((state) => ({
        formBlockErrors: { ...state.formBlockErrors, [blockId]: errors },
      })),

    clearFormBlockErrors: (blockId) =>
      set((state) => {
        const updated = { ...state.formBlockErrors };
        delete updated[blockId];
        return { formBlockErrors: updated };
      }),

    clearAllFormBlockErrors: () =>
      set(() => ({
        formBlockErrors: {},
      })),
  }),
);

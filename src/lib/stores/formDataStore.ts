import { create } from "zustand";
import { FormBlockValueType } from "@/lib/types/form";

/**
 * Form Data State
 * - Stores user input for form field data in preview/editable mode
 */
interface FormDataState {
  responses: Record<string, FormBlockValueType>;
  updateField: (key: string, value: FormBlockValueType) => void;
  resetResponses: () => void;
  getField: (key: string) => FormBlockValueType | undefined;
}

/**
 * Zustand store for managing form field data in preview/editable mode.
 */
export const useFormDataStore = create<FormDataState>((set, get) => ({
  responses: {},
  updateField: (key, value) => {
    console.log("Setting field value:", key, "=", value);
    set((state) => ({
      responses: {
        ...state.responses,
        [key]: value,
      },
    }));
  },
  resetResponses: () => {
    set({ responses: {} });
  },
  getField: (key) => {
    return get().responses[key];
  },
}));

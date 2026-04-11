import { create } from "zustand";
import { FormBlockValueType } from "@/lib/types/form";

/**
 * Form Data State
 * - Stores user input for form field data in preview/editable mode
 */
interface FormDataState {
  formData: Record<string, FormBlockValueType>;
  updateFormData: (key: string, value: FormBlockValueType) => void;
  resetFormData: () => void;
}

/**
 * Zustand store for managing form field data in preview/editable mode.
 */
export const useFormDataStore = create<FormDataState>((set, get) => ({
  formData: {},
  updateFormData: (key, value) => {
    console.log("Setting field value:", key, "=", value);
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    }));
  },
  resetFormData: () => {
    set({ formData: {} });
  },
}));

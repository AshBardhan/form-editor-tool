import { create } from "zustand";
import { FormBlock, FormBlockValueType } from "@/lib/types/form";
import { getFieldKey, getPropValue } from "@/lib/utils/formUtils";

/**
 * Form Data State
 * - Stores user input for form field data in preview/editable mode
 */
interface FormDataState {
  formData: Record<string, FormBlockValueType>;
  initFormData: (blocks: FormBlock[]) => void;
  updateFormData: (key: string, value: FormBlockValueType) => void;
  resetFormData: () => void;
}

/**
 * Zustand store for managing form field data in preview/editable mode.
 */
export const useFormDataStore = create<FormDataState>((set) => ({
  formData: {},
  initFormData: (blocks) => {
    const initialData: Record<string, FormBlockValueType> = {};

    blocks.forEach((block) => {
      const fieldKey = getFieldKey(block);
      const blockValue = getPropValue(block, "value");

      // Initialize all blocks with their value (defaults to empty string or appropriate empty value)
      initialData[fieldKey] = blockValue;
    });

    set({ formData: initialData });
  },
  updateFormData: (key, value) => {
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

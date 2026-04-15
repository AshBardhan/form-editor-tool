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
export const useFormDataStore = create<FormDataState>((set, get) => ({
  formData: {},
  initFormData: (blocks) => {
    const initialData: Record<string, FormBlockValueType> = {};

    blocks.forEach((block) => {
      const fieldKey = getFieldKey(block);
      const blockValue = getPropValue(block, "value");

      // Initialize blocks with explicit values
      if (
        blockValue !== "" &&
        blockValue !== null &&
        blockValue !== undefined
      ) {
        initialData[fieldKey] = blockValue;
        return;
      }

      // Initialize required select fields with first option
      if (block.type === "select") {
        const required = getPropValue(block, "required") || false;
        const options = (getPropValue(block, "options") ?? []) as string[];

        if (required && options.length > 0) {
          initialData[fieldKey] = options[0];
        }
      }
    });

    console.log("Initializing form data with defaults:", initialData);
    set({ formData: initialData });
  },
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

import {
  FormBlock,
  FormBlockType,
  FormBlockValueType,
  FormData,
} from "@/lib/types/form";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { getDefaultProps } from "@/lib/utils/formUtils";

interface FormDataState {
  form: FormData;
  setForm: (form: FormData) => void;
  updateForm: (key: string, value: string) => void;
  resetForm: () => void;
  addFormBlock: (type: FormBlockType, index?: number) => string;
  moveFormBlock: (fromIndex: number, toIndex: number) => void;
  updateFormBlock: (id: string, key: string, value: FormBlockValueType) => void;
  cloneFormBlock: (id: string) => void;
  removeFormBlock: (id: string) => void;
}

/**
 * Initial form data with a default title, theme and an empty array of blocks.
 */
const initialFormData: FormData = {
  title: "Untitled Form",
  theme: "light",
  blocks: [],
};

/**
 * Zustand store for managing the Form data and block operations.
 */
export const useFormDataStore = create<FormDataState>((set) => ({
  form: initialFormData,
  setForm: (form) => set({ form }),
  updateForm: (key, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    }));
  },
  resetForm: () => {
    set({
      form: initialFormData,
    });
  },
  addFormBlock: (type, index) => {
    const id = nanoid();
    const newBlock: FormBlock = {
      id,
      type,
      name: `${type}-${id}`,
      props: getDefaultProps(type),
    };

    set((state) => {
      const updated = [...state.form.blocks];
      if (index !== undefined) {
        updated.splice(index, 0, newBlock);
      } else {
        updated.push(newBlock);
      }
      return {
        form: {
          ...state.form,
          blocks: updated,
        },
      };
    });

    return id;
  },
  moveFormBlock: (from, to) => {
    set((state) => {
      const updated = [...state.form.blocks];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return {
        form: {
          ...state.form,
          blocks: updated,
        },
      };
    });
  },
  updateFormBlock: (id, key, value) => {
    set((state) => ({
      form: {
        ...state.form,
        blocks: state.form.blocks.map((b) =>
          b.id === id
            ? {
                ...b,
                props: b.props.map((p) =>
                  p.key === key ? { ...p, value } : p,
                ),
              }
            : b,
        ),
      },
    }));
  },
  cloneFormBlock: (id: string) => {
    set((state) => {
      const original = state.form.blocks.find((b) => b.id === id);
      if (!original) return {};

      const newId = nanoid();
      const clonedBlock: FormBlock = {
        ...original,
        id: newId,
        name: `${original.type}-${newId}`,
        props: original.props.map((p) => ({ ...p })),
      };

      const updated = [...state.form.blocks];
      const originalIndex = state.form.blocks.findIndex((b) => b.id === id);
      const insertAt = originalIndex >= 0 ? originalIndex + 1 : updated.length;

      updated.splice(insertAt, 0, clonedBlock);

      return {
        form: {
          ...state.form,
          blocks: updated,
        },
      };
    });
  },
  removeFormBlock: (id) => {
    set((state) => ({
      form: {
        ...state.form,
        blocks: state.form.blocks.filter((b) => b.id !== id),
      },
    }));
  },
}));

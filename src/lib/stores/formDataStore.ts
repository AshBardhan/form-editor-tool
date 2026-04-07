import {
  FormField,
  FormFieldType,
  FormFieldValueType,
  FormData,
} from "@/types/form.types";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { getDefaultProps } from "@/lib/utils/fieldUtils";

interface FormDataState {
  form: FormData;
  setForm: (form: FormData) => void;
  updateForm: (key: string, value: string) => void;
  resetForm: () => void;
  addField: (type: FormFieldType, index?: number) => string;
  moveField: (fromIndex: number, toIndex: number) => void;
  updateField: (id: string, key: string, value: FormFieldValueType) => void;
  cloneField: (id: string) => void;
  removeField: (id: string) => void;
}

/**
 * Initial form data with a default title, theme and an empty array of fields.
 */
const initialFormData: FormData = {
  title: "Untitled Form",
  theme: "light",
  fields: [],
};

/**
 * Zustand store for managing the Form data and field operations.
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
  addField: (type, index) => {
    const id = nanoid();
    const newField: FormField = {
      id,
      type,
      name: `${type}-${id}`,
      props: getDefaultProps(type),
    };

    set((state) => {
      const updated = [...state.form.fields];
      if (index !== undefined) {
        updated.splice(index, 0, newField);
      } else {
        updated.push(newField);
      }
      return {
        form: {
          ...state.form,
          fields: updated,
        },
      };
    });

    return id;
  },
  moveField: (from, to) => {
    set((state) => {
      const updated = [...state.form.fields];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return {
        form: {
          ...state.form,
          fields: updated,
        },
      };
    });
  },
  updateField: (id, key, value) => {
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((f) =>
          f.id === id
            ? {
                ...f,
                props: f.props.map((p) =>
                  p.key === key ? { ...p, value } : p,
                ),
              }
            : f,
        ),
      },
    }));
  },
  cloneField: (id: string) => {
    set((state) => {
      const original = state.form.fields.find((f) => f.id === id);
      if (!original) return {};

      const newId = nanoid();
      const clonedField: FormField = {
        ...original,
        id: newId,
        name: `${original.type}-${newId}`,
        props: original.props.map((p) => ({ ...p })),
      };

      const updated = [...state.form.fields];
      const originalIndex = state.form.fields.findIndex((f) => f.id === id);
      const insertAt = originalIndex >= 0 ? originalIndex + 1 : updated.length;

      updated.splice(insertAt, 0, clonedField);

      return {
        form: {
          ...state.form,
          fields: updated,
        },
      };
    });
  },
  removeField: (id) => {
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.filter((f) => f.id !== id),
      },
    }));
  },
}));

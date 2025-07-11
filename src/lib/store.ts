import { FormField, BaseFieldType } from "@/types/field";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { getDefaultProps } from "./utils/fieldUtils";

interface FormData {
  title: string;
  theme: "light" | "dark";
  fields: FormField[];
}

interface FormState {
  form: FormData;
  selectedFieldId: string | null;
  hoveredFieldId: string | null;
  isSidebarCollapsed: {
    left: boolean;
    right: boolean;
  };
  fieldErrors: Record<string, string[]>;
  updateForm: (key: string, value: string) => void;
  selectField: (id: string | null) => void;
  hoverField: (id: string | null) => void;
  addField: (type: BaseFieldType, index?: number) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  updateField: (id: string, key: string, value: any) => void;
  cloneField: (id: string) => void;
  removeField: (id: string) => void;
  setFieldErrors: (fieldId: string, errors: string[]) => void;
  clearFieldErrors: (fieldId: string) => void;
  toggleSidebar: (side: "left" | "right") => void;
}

export const useFormStore = create<FormState>((set) => ({
  form: {
    title: "Untitled Form",
    theme: "light",
    fields: [],
  },
  isSidebarCollapsed: {
    left: false,
    right: false,
  },
  selectedFieldId: null,
  hoveredFieldId: null,
  fieldErrors: {},
  updateForm: (key, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    }));
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
        selectedFieldId: id,
      };
    });
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
  toggleSidebar: (side: "left" | "right") => {
    set((state) => ({
      isSidebarCollapsed: {
        ...state.isSidebarCollapsed,
        [side]: !state.isSidebarCollapsed[side],
      },
    }));
  },
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
}));

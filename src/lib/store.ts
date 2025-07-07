import { Field } from "@/types/field";
import { create } from "zustand";

interface FormState {
  fields: Field[];
  selectedFieldId: string | null;
  selectField: (id: string | null) => void;
  addField: (field: Field) => void;
  insertFieldAt: (field: Field, index: number) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  updateField: (id: string, key: string, value: any) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  fields: [],
  selectedFieldId: null,
  selectField: (id) => set({ selectedFieldId: id }),
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  insertFieldAt: (field: Field, index: number) => {
    set((state) => {
      const updatedFields = [...state.fields];
      updatedFields.splice(index, 0, field);
      return { fields: updatedFields };
    });
  },
  moveField: (from, to) => {
    set((state) => {
      const updated = [...state.fields];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return { fields: updated };
    });
  },
  updateField: (id, key, value) => {
    set((state) => ({
      fields: state.fields.map((f) =>
        f.id === id
          ? {
              ...f,
              props: f.props.map((p) => (p.key === key ? { ...p, value } : p)),
            }
          : f,
      ),
    }));
  },
  removeField: (id) => {
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
    }));
  },
}));

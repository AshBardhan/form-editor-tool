import { create } from "zustand";

export type Field = {
  id: string;
  type: "text" | "textarea" | "select";
  label: string;
  required?: boolean;
}

interface FormState {
  fields: Field[];
  addField: (field: Field) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  fields: [],
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  moveField: (from, to) =>
    set((state) => {
      const updated = [...state.fields];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return { fields: updated };
    }),
  removeField: (id) => {
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
    }))
  },
}));

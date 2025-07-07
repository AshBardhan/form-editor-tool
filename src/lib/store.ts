import { Field, FieldType } from "@/types/field";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { getDefaultProps } from "./constants/defaultFieldProps";

interface FormState {
  fields: Field[];
  selectedFieldId: string | null;
  hoveredFieldId: string | null;
  selectField: (id: string | null) => void;
  hoverField: (id: string | null) => void;
  addField: (type: FieldType, index?: number) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  updateField: (id: string, key: string, value: any) => void;
  cloneField: (id: string) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  fields: [],
  selectedFieldId: null,
  hoveredFieldId: null,
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
    const newField: Field = {
      id,
      type,
      name: `${type}-${id}`,
      props: getDefaultProps(type),
    };

    set((state) => {
      const updated = [...state.fields];
      if (index !== undefined) {
        updated.splice(index, 0, newField);
      } else {
        updated.push(newField);
      }
      return { fields: updated };
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
cloneField: (id: string) => {
  set((state) => {
    const original = state.fields.find((f) => f.id === id);
    if (!original) return {};

    const newId = nanoid();
    const clonedField: Field = {
      ...original,
      id: newId,
      name: `${original.type}-${newId}`,
      props: original.props.map((p) => ({ ...p })),
    };

    const updated = [...state.fields];
    const originalIndex = state.fields.findIndex((f) => f.id === id);
    const insertAt = originalIndex >= 0 ? originalIndex + 1 : updated.length;

    updated.splice(insertAt, 0, clonedField);

    return { fields: updated };
  });
  },
  removeField: (id) => {
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
    }));
  },
}));

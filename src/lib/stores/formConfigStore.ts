import {
  FormBlock,
  FormBlockType,
  FormBlockValueType,
  FormConfig,
} from "@/lib/types/form";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultProps, generateUniqueKey } from "@/lib/utils/formUtils";

interface FormConfigState {
  form: FormConfig;
  setForm: (form: FormConfig) => void;
  updateForm: (key: string, value: string) => void;
  resetForm: () => void;
  addFormBlock: (type: FormBlockType, index?: number) => string;
  moveFormBlock: (fromIndex: number, toIndex: number) => void;
  updateFormBlock: (id: string, key: string, value: FormBlockValueType) => void;
  cloneFormBlock: (id: string) => void;
  removeFormBlock: (id: string) => void;
}

/**
 * Initial form config with a default title, theme and an empty array of blocks.
 */
const initialFormConfig: FormConfig = {
  id: undefined, // No ID for new forms
  title: "Untitled Form",
  theme: "light",
  blocks: [],
};

/**
 * Zustand store for managing the Form config and block operations.
 * Uses localStorage persistence to preserve form config across tabs and page refreshes.
 */
export const useFormConfigStore = create<FormConfigState>()(
  persist(
    (set, get) => ({
      form: initialFormConfig,
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
          form: initialFormConfig,
        });
      },
      addFormBlock: (type, index) => {
        const state = get();
        const id = nanoid();
        const defaultProps = getDefaultProps(type);

        // Auto-generate key from label if the block has a key prop
        const updatedProps = defaultProps.map((prop) => {
          if (prop.key === "key") {
            const labelProp = defaultProps.find((p) => p.key === "label");
            const label =
              typeof labelProp?.value === "string" ? labelProp.value : type;
            // Generate unique key based on current blocks
            const uniqueKey = generateUniqueKey(label, state.form.blocks);
            return { ...prop, value: uniqueKey };
          }
          return prop;
        });

        const newBlock: FormBlock = {
          id,
          type,
          name: `${type}-${id}`,
          props: updatedProps,
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
            blocks: state.form.blocks.map((b) => {
              if (b.id !== id) return b;

              // Update the specified prop
              let updatedProps = b.props.map((p) =>
                p.key === key ? { ...p, value } : p,
              );

              // If label is being updated and key exists, auto-update key
              if (key === "label") {
                const keyProp = updatedProps.find((p) => p.key === "key");
                if (keyProp) {
                  const uniqueKey = generateUniqueKey(
                    value as string,
                    state.form.blocks,
                    id,
                  );
                  updatedProps = updatedProps.map((p) =>
                    p.key === "key" ? { ...p, value: uniqueKey } : p,
                  );
                }
              }

              return {
                ...b,
                props: updatedProps,
              };
            }),
          },
        }));
      },
      cloneFormBlock: (id: string) => {
        set((state) => {
          const original = state.form.blocks.find((b) => b.id === id);
          if (!original) return {};

          const newId = nanoid();

          // Clone props and update key if it exists
          const clonedProps = original.props.map((p) => {
            if (p.key === "key" && p.value) {
              // Generate unique key for the cloned block
              const labelProp = original.props.find(
                (prop) => prop.key === "label",
              );
              const label =
                typeof labelProp?.value === "string"
                  ? labelProp.value
                  : original.type;
              const uniqueKey = generateUniqueKey(label, state.form.blocks);
              return { ...p, value: uniqueKey };
            }
            return { ...p };
          });

          const clonedBlock: FormBlock = {
            ...original,
            id: newId,
            name: `${original.type}-${newId}`,
            props: clonedProps,
          };

          const updated = [...state.form.blocks];
          const originalIndex = state.form.blocks.findIndex((b) => b.id === id);
          const insertAt =
            originalIndex >= 0 ? originalIndex + 1 : updated.length;

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
    }),
    {
      name: "form-builder-storage", // localStorage key
    },
  ),
);

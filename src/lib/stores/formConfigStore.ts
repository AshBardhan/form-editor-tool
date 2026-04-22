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
  formConfig: FormConfig;
  setFormConfig: (data: FormConfig) => void;
  updateFormConfig: (key: string, value: string) => void;
  resetFormConfig: () => void;
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
      formConfig: initialFormConfig,
      setFormConfig: (data) => set({ formConfig: data }),
      updateFormConfig: (key, value) => {
        set((state) => ({
          formConfig: {
            ...state.formConfig,
            [key]: value,
          },
        }));
      },
      resetFormConfig: () => {
        set({
          formConfig: initialFormConfig,
        });
      },
      addFormBlock: (type, index) => {
        const state = get();
        const id = nanoid();
        const defaultProps = getDefaultProps(type);

        // Auto-generate key from label if the block has a key prop
        if ("key" in defaultProps && "label" in defaultProps) {
          const label =
            typeof defaultProps.label === "string" ? defaultProps.label : type;
          const uniqueKey = generateUniqueKey(label, state.formConfig.blocks);
          defaultProps.key = uniqueKey;
        }

        const newBlock: FormBlock = {
          id,
          type,
          name: `${type}-${id}`,
          props: defaultProps,
        };

        set((state) => {
          const updated = [...state.formConfig.blocks];
          if (index !== undefined) {
            updated.splice(index, 0, newBlock);
          } else {
            updated.push(newBlock);
          }
          return {
            formConfig: {
              ...state.formConfig,
              blocks: updated,
            },
          };
        });

        return id;
      },
      moveFormBlock: (from, to) => {
        set((state) => {
          const updated = [...state.formConfig.blocks];
          const [moved] = updated.splice(from, 1);
          updated.splice(to, 0, moved);
          return {
            formConfig: {
              ...state.formConfig,
              blocks: updated,
            },
          };
        });
      },
      updateFormBlock: (id, key, value) => {
        set((state) => ({
          formConfig: {
            ...state.formConfig,
            blocks: state.formConfig.blocks.map((b) => {
              if (b.id !== id) return b;

              let updatedProps = {
                ...b.props,
                [key]: value,
              };

              // Checkbox grouped logic
              if (b.type === "checkbox") {
                // If grouped is toggled
                if (key === "grouped") {
                  if (value === true) {
                    // When switching to grouped, set to default if not already
                    updatedProps.orientation =
                      updatedProps.orientation || "vertical";
                    // Set options to two default options if empty or not an array
                    if (
                      !Array.isArray(updatedProps.options) ||
                      updatedProps.options.length === 0
                    ) {
                      updatedProps.options = ["Option 1", "Option 2"];
                    }
                  } else {
                    // Reset orientation and options to default values
                    updatedProps.orientation = "vertical";
                    updatedProps.options = [];
                  }
                }
                // If orientation or options are changed while grouped is false, ignore changes
                if (
                  (key === "orientation" || key === "options") &&
                  updatedProps.grouped === false
                ) {
                  updatedProps.orientation = "vertical";
                  updatedProps.options = [];
                }
              }

              // If label is being updated and key exists, auto-update key
              if (key === "label" && "key" in updatedProps) {
                const uniqueKey = generateUniqueKey(
                  value as string,
                  state.formConfig.blocks,
                  id,
                );
                updatedProps.key = uniqueKey;
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
          const original = state.formConfig.blocks.find((b) => b.id === id);
          if (!original) return {};

          const newId = nanoid();

          // Clone props and update key if it exists
          const clonedProps = { ...original.props };
          if ("key" in clonedProps && clonedProps.key) {
            // Generate unique key for the cloned block
            const label =
              typeof clonedProps.label === "string"
                ? clonedProps.label
                : original.type;
            const uniqueKey = generateUniqueKey(label, state.formConfig.blocks);
            clonedProps.key = uniqueKey;
          }

          const clonedBlock: FormBlock = {
            ...original,
            id: newId,
            name: `${original.type}-${newId}`,
            props: clonedProps,
          };

          const updated = [...state.formConfig.blocks];
          const originalIndex = state.formConfig.blocks.findIndex(
            (b) => b.id === id,
          );
          const insertAt =
            originalIndex >= 0 ? originalIndex + 1 : updated.length;

          updated.splice(insertAt, 0, clonedBlock);

          return {
            formConfig: {
              ...state.formConfig,
              blocks: updated,
            },
          };
        });
      },
      removeFormBlock: (id) => {
        set((state) => ({
          formConfig: {
            ...state.formConfig,
            blocks: state.formConfig.blocks.filter((b) => b.id !== id),
          },
        }));
      },
    }),
    {
      name: "form-builder-storage", // localStorage key
    },
  ),
);

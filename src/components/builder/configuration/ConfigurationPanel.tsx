"use client";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { THEME_OPTIONS } from "@/lib/constants/theme";
import { getFormBlock, getFormBlockProps } from "@/lib/utils/formUtils";
import { ScrollTextIcon } from "lucide-react";
import { JSX, useEffect, useState, memo, useCallback } from "react";
import z from "zod";
import {
  InputConfig,
  LongTextConfig,
  CheckboxConfig,
  SelectConfig,
  ListConfig,
} from "@/components/form/configs";
import {
  useFormBlockValidationStore,
  useFormConfigStore,
  useUIStateStore,
} from "@/lib/stores";
import { AnimatePresence, motion } from "motion/react";
import { visibleContentVariants } from "@/lib/constants/styles";
import { cn } from "@/lib/utils/styleUtils";
import { switchTheme } from "@/lib/utils/domUtils";

/**
 * Configuration Panel (Right Sidebar)
 * - Provides a right sidebar for configuring form blocks.
 * - Allows users to edit properties of selected form blocks and update form settings.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const ConfigurationPanel = memo(
  function ConfigurationPanel(): JSX.Element {
    const formTitle = useFormConfigStore((state) => state.formConfig.title);
    const formTheme = useFormConfigStore((state) => state.formConfig.theme);
    const formBlocks = useFormConfigStore((state) => state.formConfig.blocks);
    const updateFormBlock = useFormConfigStore(
      (state) => state.updateFormBlock,
    );
    const updateFormConfig = useFormConfigStore(
      (state) => state.updateFormConfig,
    );
    const updateFormBlockErrors = useFormBlockValidationStore(
      (state) => state.updateFormBlockErrors,
    );
    const clearFormBlockErrors = useFormBlockValidationStore(
      (state) => state.clearFormBlockErrors,
    );
    const selectedBlockId = useUIStateStore(
      (state) => state.selectedFormBlockId,
    );
    const selected = formBlocks.find((f) => f.id === selectedBlockId);
    const selectedMeta = selected ? getFormBlock(selected.type) : null;
    const Icon = selectedMeta?.icon ?? ScrollTextIcon;
    const schema = selectedMeta?.schema;

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    /**
     * Handles theme change for the form.
     *
     * @param {string} value - The selected theme value.
     */
    const onThemeChange = (value: string) => {
      switchTheme(value);
      updateFormConfig("theme", value);
    };

    /**
     * Validates the properties of the selected block against its schema.
     */
    const validateProps = useCallback(() => {
      if (!selected || !schema) return;

      const result = schema.safeParse(selected.props);

      if (!result.success) {
        const formBlockErrors = z.flattenError(result.error)
          .fieldErrors as Record<string, string[]>;
        setErrors(formBlockErrors);
        const combined = Object.entries(formBlockErrors).flatMap(
          ([, msgs]) => msgs,
        );
        updateFormBlockErrors(selected.id, combined);
      } else {
        // Schema validation passed, now check key uniqueness
        const keyValue = selected.props.key;

        if (keyValue && typeof keyValue === "string" && keyValue.trim()) {
          // Check if any other block has the same key
          const isDuplicateKey = formBlocks.some(
            (block) => block.id !== selected.id && block.props.key === keyValue,
          );

          if (isDuplicateKey) {
            const uniquenessError = {
              key: ["Key must be unique across all form blocks"],
            };
            setErrors(uniquenessError);
            updateFormBlockErrors(selected.id, uniquenessError.key);
            return;
          }
        }

        // All validations passed
        setErrors({});
        clearFormBlockErrors(selected.id);
      }
    }, [
      selected,
      schema,
      formBlocks,
      updateFormBlockErrors,
      clearFormBlockErrors,
    ]);

    /**
     * Checks if a property has validation errors.
     *
     * @param {string} propKey - The key of the property to check.
     * @returns {boolean} True if the property has errors, otherwise false.
     */
    const hasErrorProp = (propKey: string) =>
      errors && errors[propKey] && errors[propKey].length;

    /* Validaton check on any property change */
    useEffect(() => {
      validateProps();
    }, [selected?.props, validateProps]);

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selected?.id ? `block-config-${selected.id}` : "form-config"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={visibleContentVariants}
        >
          <div className="p-4 border-b border-b-[#2d2d2d]">
            <h2 className="font-semibold flex items-center gap-2">
              {Icon && <Icon size={20} />}
              {selected ? selectedMeta?.label : "Form"} Configuration
            </h2>
          </div>
          {selected ? (
            <>
              {/* Block Configuration Panel */}
              <div className="p-4 flex flex-col gap-4 dark">
                {getFormBlockProps(selected).map((prop) => {
                  const selectedBlockPropKey = `${selected.id}-${prop.key}`;
                  return (
                    <div
                      className="flex flex-col gap-2 focus-within:shadow-none!"
                      key={selectedBlockPropKey}
                    >
                      {/* Block Property Label */}
                      {prop.type !== "boolean" && (
                        <Label
                          htmlFor={selectedBlockPropKey}
                          className="font-semibold"
                        >
                          {prop.label}
                        </Label>
                      )}

                      {/* Block Property Text Input (Regular and Long String types) */}
                      {prop.type === "string" &&
                        typeof prop.value === "string" && (
                          <InputConfig
                            id={selectedBlockPropKey}
                            value={prop.value ?? ""}
                            className={cn(
                              "focus-visible:ring-0 focus-visible:shadow-none!",
                              hasErrorProp(prop.key) && "border-destructive!",
                            )}
                            onChange={(value) =>
                              updateFormBlock(selected.id, prop.key, value)
                            }
                          />
                        )}

                      {prop.type === "long-string" &&
                        typeof prop.value === "string" && (
                          <LongTextConfig
                            id={selectedBlockPropKey}
                            value={prop.value ?? ""}
                            className={cn(
                              "resize-y focus-visible:ring-0 focus-visible:shadow-none!",
                              hasErrorProp(prop.key) && "border-destructive!",
                            )}
                            onChange={(value) =>
                              updateFormBlock(selected.id, prop.key, value)
                            }
                          />
                        )}

                      {/* Block Property Number Input */}
                      {prop.type === "number" &&
                        typeof prop.value === "number" && (
                          <InputConfig
                            type="number"
                            id={selectedBlockPropKey}
                            value={prop.value ?? 0}
                            className={cn(
                              "focus-visible:ring-0 focus-visible:shadow-none!",
                              hasErrorProp(prop.key) && "border-destructive!",
                            )}
                            onChange={(value) =>
                              updateFormBlock(selected.id, prop.key, value)
                            }
                          />
                        )}

                      {/* Block Property Checkbox */}
                      {prop.type === "boolean" && (
                        <CheckboxConfig
                          id={selectedBlockPropKey}
                          label={prop.label}
                          value={Boolean(prop.value)}
                          onChange={(value) =>
                            updateFormBlock(selected.id, prop.key, value)
                          }
                        />
                      )}

                      {/* Block Property Selectbox */}
                      {prop.type === "select" &&
                        typeof prop.value === "string" && (
                          <SelectConfig
                            id={selectedBlockPropKey}
                            value={prop.value}
                            options={prop.options ?? []}
                            onChange={(value) =>
                              updateFormBlock(selected.id, prop.key, value)
                            }
                          />
                        )}

                      {/* Block Property Listbox */}
                      {prop.type === "list" && Array.isArray(prop.value) && (
                        <ListConfig
                          id={selectedBlockPropKey}
                          value={prop.value}
                          onChange={(val) =>
                            updateFormBlock(selected.id, prop.key, val)
                          }
                        />
                      )}

                      {/* Block Property Validation Error Messages */}
                      {hasErrorProp(prop.key) > 0 &&
                        errors[prop.key].map((error, idx) => (
                          <div key={idx} className="text-xs text-destructive">
                            {error}
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Form Configuration Panel */}
              <div className="p-4 flex flex-col gap-4 dark">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="form-title" className="font-semibold">
                    Title
                  </Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    className="focus-visible:ring-0 focus-visible:shadow-none!"
                    onChange={(e) => updateFormConfig("title", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="form-theme" className="font-semibold">
                    Theme
                  </Label>
                  <Select value={formTheme} onValueChange={onThemeChange}>
                    <SelectTrigger
                      id="form-theme"
                      className="w-full focus-visible:ring-0 focus-visible:shadow-none!"
                    >
                      <SelectValue placeholder="Select theme">
                        {THEME_OPTIONS[formTheme]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(THEME_OPTIONS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    );
  },
);

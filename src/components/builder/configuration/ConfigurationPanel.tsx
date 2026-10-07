"use client";

import { THEME_OPTIONS } from "@/lib/constants/theme";
import { BUTTON_ALIGNMENT_OPTIONS } from "@/lib/constants/buttons";
import { getFormBlock, getFormBlockProps } from "@/lib/utils/formUtils";
import { ScrollTextIcon, MoreVertical, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { AppButton } from "@/design-system/app/AppButton";
import { AppLabel } from "@/design-system/app/AppLabel";
import { AppText } from "@/design-system/app/AppText";
import { JSX, useEffect, useState, useMemo, memo, useCallback } from "react";
import z from "zod";
import { FormBlock } from "@/lib/types/form";
import type { ButtonAlignment, FormBlockPropTemplate } from "@/lib/types/form";
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
import { switchFormTheme } from "@/lib/utils/domUtils";

/**
 * Configuration Panel (Right Sidebar)
 * - Provides a right sidebar for configuring form blocks.
 * - Allows users to edit properties of selected form blocks and update form settings.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const ConfigurationPanel = memo(function ConfigurationPanel({
  onDeleteBlock,
}: {
  onDeleteBlock?: (blockId: string) => void;
}): JSX.Element {
  const formTitle = useFormConfigStore((state) => state.formConfig.title);
  const formTheme = useFormConfigStore((state) => state.formConfig.theme);
  const formActions = useFormConfigStore((state) => state.formConfig.actions);
  const formBlocks = useFormConfigStore((state) => state.formConfig.blocks);
  const updateFormBlock = useFormConfigStore((state) => state.updateFormBlock);
  const updateFormConfig = useFormConfigStore(
    (state) => state.updateFormConfig,
  );
  const updateFormActions = useFormConfigStore(
    (state) => state.updateFormActions,
  );
  const cloneFormBlock = useFormConfigStore((state) => state.cloneFormBlock);
  const updateFormBlockErrors = useFormBlockValidationStore(
    (state) => state.updateFormBlockErrors,
  );
  const clearFormBlockErrors = useFormBlockValidationStore(
    (state) => state.clearFormBlockErrors,
  );
  const selectedBlockId = useUIStateStore((state) => state.selectedFormBlockId);
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
    switchFormTheme(value);
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

  function computeVisibleProps(selected: FormBlock) {
    let propsArr = getFormBlockProps(selected);

    if (selected.type === "checkbox") {
      const grouped = Boolean(propsArr.find((p) => p.key === "grouped")?.value);

      propsArr = propsArr.map((prop) => {
        if (prop.key === "orientation" || prop.key === "options") {
          return { ...prop, hidden: !grouped };
        }
        return prop;
      });
    }

    return propsArr.filter((prop) => !prop.hidden);
  }

  const visibleProps = useMemo(() => {
    if (selected) {
      return computeVisibleProps(selected as FormBlock);
    }
    return [];
  }, [selected]);

  // Helper to render each prop config
  function renderPropConfig(prop: FormBlockPropTemplate) {
    if (!selected) return null;

    const selectedBlockPropKey = `${selected.id}-${prop.key}`;
    const errorId = `${selectedBlockPropKey}-error`;
    const labelId = `${selectedBlockPropKey}-label`;
    const shouldShowError = Boolean(hasErrorProp(prop.key));
    const describedBy = shouldShowError ? errorId : undefined;
    const isList = prop.type === "list";

    const label =
      prop.type !== "boolean" ? (
        <AppLabel
          htmlFor={isList ? undefined : selectedBlockPropKey}
          id={isList ? labelId : undefined}
          size="sm"
          className="font-semibold"
        >
          {prop.label}
        </AppLabel>
      ) : null;

    let propConfig: JSX.Element | null = null;
    switch (prop.type) {
      case "string":
        propConfig = (
          <InputConfig
            id={selectedBlockPropKey}
            value={prop.value == null ? "" : String(prop.value)}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(value) => updateFormBlock(selected.id, prop.key, value)}
          />
        );
        break;
      case "long-string":
        propConfig = (
          <LongTextConfig
            id={selectedBlockPropKey}
            value={prop.value == null ? "" : String(prop.value)}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(value) => updateFormBlock(selected.id, prop.key, value)}
          />
        );
        break;
      case "number":
        propConfig = (
          <InputConfig
            type="number"
            id={selectedBlockPropKey}
            value={typeof prop.value === "number" ? prop.value : 0}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(value) => updateFormBlock(selected.id, prop.key, value)}
          />
        );
        break;
      case "boolean":
        propConfig = (
          <CheckboxConfig
            id={selectedBlockPropKey}
            label={prop.label}
            value={Boolean(prop.value)}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(value) => updateFormBlock(selected.id, prop.key, value)}
          />
        );
        break;
      case "select":
        propConfig = (
          <SelectConfig
            id={selectedBlockPropKey}
            value={prop.value as string}
            options={prop.options ?? []}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(value) => updateFormBlock(selected.id, prop.key, value)}
          />
        );
        break;
      case "list":
        propConfig = (
          <ListConfig
            id={selectedBlockPropKey}
            labelledBy={labelId}
            value={Array.isArray(prop.value) ? (prop.value as string[]) : []}
            aria-invalid={shouldShowError}
            aria-describedby={describedBy}
            onChange={(val: string[]) =>
              updateFormBlock(selected.id, prop.key, val)
            }
          />
        );
        break;
      default:
        propConfig = null;
    }

    const errorMessages = shouldShowError ? (
      <div id={errorId} role="alert" className="flex flex-col gap-1">
        {errors[prop.key].map((err, idx) => (
          <AppText
            key={idx}
            variant="span"
            className="text-xs text-app-error sm:text-xs 2xl:text-xs"
          >
            {err}
          </AppText>
        ))}
      </div>
    ) : null;

    return (
      <div
        className="flex flex-col gap-2 focus-within:shadow-none!"
        key={selectedBlockPropKey}
      >
        {label}
        {propConfig}
        {errorMessages}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selected?.id ? `block-config-${selected.id}` : "form-config"}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={visibleContentVariants}
      >
        <div className="p-4 border-b border-b-app-sidebar-border flex items-center justify-between gap-2">
          <AppText
            variant="h3"
            className="flex items-center gap-2 text-sm font-semibold sm:text-sm 2xl:text-sm"
          >
            {Icon && <Icon size={20} />}
            {selected ? selectedMeta?.label : "Form"} Config
          </AppText>
          {selected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AppButton
                  variant="ghost"
                  color="secondary"
                  size="md"
                  className="size-8 p-0"
                  aria-label="Open menu"
                >
                  <MoreVertical />
                </AppButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => selected && cloneFormBlock(selected.id)}
                >
                  <Copy size={16} className="mr-2" />
                  Clone
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => selected && onDeleteBlock?.(selected.id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {selected ? (
          <>
            {/* Block Configuration Panel */}
            <div className="p-4 flex flex-col gap-4 border-b border-b-app-sidebar-border">
              {visibleProps.map(renderPropConfig)}
            </div>
          </>
        ) : (
          <>
            {/* Form Configuration Panel */}
            <div className="flex flex-col gap-4 p-4 border-b border-b-app-sidebar-border">
              <AppText
                variant="h4"
                className="text-sm font-semibold sm:text-sm 2xl:text-sm"
              >
                General
              </AppText>

              <div className="flex flex-col gap-2">
                <AppLabel
                  htmlFor="form-title"
                  size="sm"
                  className="font-semibold"
                >
                  Title
                </AppLabel>
                <InputConfig
                  id="form-title"
                  value={formTitle}
                  onChange={(value) => updateFormConfig("title", String(value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <AppLabel
                  htmlFor="form-theme"
                  size="sm"
                  className="font-semibold"
                >
                  Theme
                </AppLabel>
                <SelectConfig
                  id="form-theme"
                  value={formTheme}
                  options={Object.entries(THEME_OPTIONS).map(
                    ([value, label]) => ({ value, label }),
                  )}
                  onChange={onThemeChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4 border-b border-b-app-sidebar-border">
              <AppText
                variant="h4"
                className="text-sm font-semibold sm:text-sm 2xl:text-sm"
              >
                Action Group
              </AppText>

              <div className="flex flex-col gap-2">
                <AppLabel
                  htmlFor="form-actions-submit-label"
                  size="sm"
                  className="font-semibold"
                >
                  Submit Label
                </AppLabel>
                <InputConfig
                  id="form-actions-submit-label"
                  value={formActions.submitLabel}
                  onChange={(value) =>
                    updateFormActions("submitLabel", String(value))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <AppLabel
                  htmlFor="form-actions-reset-label"
                  size="sm"
                  className="font-semibold"
                >
                  Reset Label
                </AppLabel>
                <InputConfig
                  id="form-actions-reset-label"
                  value={formActions.resetLabel}
                  disabled={formActions.hideReset}
                  onChange={(value) =>
                    updateFormActions("resetLabel", String(value))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <AppLabel
                  htmlFor="form-actions-alignment"
                  size="sm"
                  className="font-semibold"
                >
                  Alignment
                </AppLabel>
                <SelectConfig
                  id="form-actions-alignment"
                  value={formActions.alignment}
                  options={BUTTON_ALIGNMENT_OPTIONS}
                  onChange={(value) =>
                    updateFormActions("alignment", value as ButtonAlignment)
                  }
                />
              </div>

              <CheckboxConfig
                id="form-actions-reverse"
                label="Reverse order"
                value={formActions.reverse}
                onChange={(value) => updateFormActions("reverse", value)}
              />

              <CheckboxConfig
                id="form-actions-hide-reset"
                label="Hide reset button"
                value={formActions.hideReset}
                onChange={(value) => updateFormActions("hideReset", value)}
              />
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

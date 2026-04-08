"use client";

import React, { JSX } from "react";
import { FormConfig, FormBlock, FormBlockValueType } from "@/lib/types/form";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { useFormDataStore } from "@/lib/stores";
import { getFieldKey } from "@/lib/utils/formUtils";

interface FormPreviewProps {
  form: FormConfig;
  editable?: boolean;
}

/**
 * Form Preview
 * - Renders all form blocks in preview mode
 * - Supports both read-only and editable modes
 *
 * @param {FormPreviewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreview = ({
  form,
  editable = false,
}: FormPreviewProps): JSX.Element => {
  const { updateField } = useFormDataStore();

  /**
   * Handles form field value changes
   *
   * @param {string} key - The field key.
   * @param {FormBlockValueType} value - The field value.
   */
  const handleFieldChange = (key: string, value: FormBlockValueType) => {
    updateField(key, value);
  };

  /**
   * Renders a single form block using the appropriate renderer
   *
   * @param {FormBlock} block - The form block to render.
   * @returns {JSX.Element | null} The rendered block or null if no renderer is found.
   */
  const renderFormBlock = (block: FormBlock): JSX.Element | null => {
    const FormRenderer = widgetBlockRenderers[block.type];

    if (!FormRenderer) return null;

    // Check if the renderer accepts an 'editable' prop (input-based blocks)
    const isInputBlock = [
      "text",
      "number",
      "email",
      "password",
      "url",
      "textarea",
      "checkbox",
      "select",
      "radio",
    ].includes(block.type);

    // Pass editable prop and onChange handler to input-based blocks
    if (isInputBlock) {
      // Type assertion for input blocks that support editable and onChange
      const InputRenderer = FormRenderer as React.ComponentType<{
        block: FormBlock;
        editable?: boolean;
        onChange?: (value: FormBlockValueType) => void;
      }>;
      return (
        <InputRenderer
          block={block}
          editable={editable}
          onChange={(value: FormBlockValueType) => handleFieldChange(getFieldKey(block), value)}
        />
      );
    }
    
    return <FormRenderer block={block} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-black shadow dark:shadow-white/80 transition-colors rounded-lg">
        {form.blocks.length === 0 ? (
          <div className="min-h-100 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p className="text-center">
              No form blocks found.
              <br />
              <span className="text-sm">
                Please add blocks in the form builder.
              </span>
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");
            }}
            className="p-8 space-y-6"
          >
            {form.blocks.map((block) => (
              <div key={block.id} className="form-block-wrapper">
                {renderFormBlock(block)}
              </div>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

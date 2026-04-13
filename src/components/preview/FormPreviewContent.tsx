"use client";

import React, { JSX } from "react";
import { FormConfig, FormBlock, FormBlockValueType } from "@/lib/types/form";
import Text from "@/components/ui/Text";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { useFormDataStore } from "@/lib/stores";
import { getFieldKey } from "@/lib/utils/formUtils";
import { DeviceList, DeviceType } from "@/lib/constants/device";

interface FormPreviewContentProps {
  form: FormConfig;
  editable?: boolean;
  currentDevice: DeviceType;
}

/**
 * Form Preview Content
 * - Renders all form blocks in preview mode
 * - Supports both read-only and editable modes
 * - Collects form data on submission
 *
 * @param {FormPreviewContentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewContent = ({
  form,
  editable = false,
  currentDevice,
}: FormPreviewContentProps): JSX.Element => {
  const { formData, updateFormData, resetFormData } = useFormDataStore();
  const currentDeviceMeta = DeviceList.find(
    (device) => device.label === currentDevice,
  );

  /**
   * Handles form field value changes
   *
   * @param {string} key - The field key.
   * @param {FormBlockValueType} value - The field value.
   */
  const handleFieldChange = (key: string, value: FormBlockValueType) => {
    updateFormData(key, value);
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form data is already collected in form data store!
    console.log("Form submitted successfully!");
    console.log("Form Data:", formData);

    // You could also send this data to an API here
    // Example: await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
  };

  /**
   * Handles form reset
   */
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFormData();
    console.log("Form reset");
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
        value?: FormBlockValueType;
        onChange?: (value: FormBlockValueType) => void;
      }>;

      const fieldKey = getFieldKey(block);
      const currentValue = formData[fieldKey];

      return (
        <InputRenderer
          block={block}
          editable={editable}
          value={currentValue}
          onChange={(value: FormBlockValueType) =>
            handleFieldChange(fieldKey, value)
          }
        />
      );
    }

    return <FormRenderer block={block} />;
  };

  return (
    <div className="form-container">
      <div
        className="form-content"
        style={{ maxWidth: currentDeviceMeta?.size }}
      >
        {form.blocks.length === 0 ? (
          <div className="h-full text-gray-500 dark:text-white transition-colors flex flex-col items-center justify-center">
            <Text variant="h3">Empty form</Text>
            <Text variant="p" className="text-sm">
              Please add widgets from the form builder.
            </Text>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            {form.blocks.map((block) => (
              <div key={block.id}>{renderFormBlock(block)}</div>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

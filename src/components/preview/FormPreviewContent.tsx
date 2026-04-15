"use client";

import React, { JSX, useState } from "react";
import { FormConfig, FormBlock, FormBlockValueType } from "@/lib/types/form";
import Text from "@/components/ui/Text";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { useFormDataStore } from "@/lib/stores";
import { getFieldKey } from "@/lib/utils/formUtils";
import {
  validateFormBlock,
  isInputBlockType,
} from "@/lib/utils/formValidationUtils";
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
  const formData = useFormDataStore((state) => state.formData);
  const updateFormData = useFormDataStore((state) => state.updateFormData);
  const initFormData = useFormDataStore((state) => state.initFormData);
  const [blockErrors, setBlockErrors] = useState<Record<string, string[]>>({});
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
   * Validates a single form block
   *
   * @param {FormBlock} block - The form block to validate.
   * @returns {string[]} Array of error messages (empty if valid).
   */
  const validateBlock = (block: FormBlock): string[] => {
    const fieldKey = getFieldKey(block);
    const value = formData[fieldKey];
    return validateFormBlock(block, value);
  };

  /**
   * Validates all form blocks
   *
   * @returns {boolean} True if form is valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string[]> = {};
    let isValid = true;

    form.blocks.forEach((block) => {
      const blockValidationErrors = validateBlock(block);
      if (blockValidationErrors.length > 0) {
        isValid = false;
        errors[block.id] = blockValidationErrors;
      }
    });

    setBlockErrors(errors);

    // TODO: Show toast/notification if validation fails
    if (!isValid) {
      console.log("Please fix validation errors before submitting");
    }

    return isValid;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Clear any existing errors
    setBlockErrors({});

    // Form is valid - proceed with submission
    console.log("✅ Form submitted successfully!");
    console.log("Form Data:", formData);

    // You could also send this data to an API here
    // Example: await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
  };

  /**
   * Handles form reset
   */
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initFormData(form.blocks);
    setBlockErrors({});
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
    const isInputBlock = isInputBlockType(block.type);

    // Pass editable prop and onChange handler to input-based blocks
    if (isInputBlock) {
      // Type assertion for input blocks that support editable and onChange
      const InputRenderer = FormRenderer as React.ComponentType<{
        block: FormBlock;
        editable?: boolean;
        value?: FormBlockValueType;
        onChange?: (value: FormBlockValueType) => void;
        errors?: string[];
      }>;

      const fieldKey = getFieldKey(block);
      const currentValue = formData[fieldKey];
      const errors = blockErrors[block.id] || [];

      return (
        <InputRenderer
          key={block.id}
          block={block}
          editable={editable}
          value={currentValue}
          onChange={(value: FormBlockValueType) =>
            handleFieldChange(fieldKey, value)
          }
          errors={errors}
        />
      );
    }

    return <FormRenderer key={block.id} block={block} />;
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
          <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
            {form.blocks.map((block) => renderFormBlock(block))}
          </form>
        )}
      </div>
    </div>
  );
};

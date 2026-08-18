"use client";

import React, { JSX, useState, useEffect } from "react";
import { FormBlock, FormBlockValueType } from "@/lib/types/form";
import Text from "@/components/ui/Text";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { FormSubmitControls } from "@/components/form/FormSubmitControls";
import { useFormConfigStore, useFormDataStore } from "@/lib/stores";
import { getFieldKey, isFieldBasedBlock } from "@/lib/utils/formUtils";
import { validateFormBlock } from "@/lib/utils/formValidationUtils";
import { DeviceList, DeviceType } from "@/lib/constants/device";
import { toast } from "@/components/ui/Toast";
import { switchFormTheme } from "@/lib/utils/domUtils";

interface FormPreviewContentProps {
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
  editable = false,
  currentDevice,
}: FormPreviewContentProps): JSX.Element => {
  const form = useFormConfigStore((state) => state.formConfig);
  const formData = useFormDataStore((state) => state.formData);
  const updateFormData = useFormDataStore((state) => state.updateFormData);
  const resetFormData = useFormDataStore((state) => state.resetFormData);
  const [blockErrors, setBlockErrors] = useState<Record<string, string[]>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currentDeviceMeta = DeviceList.find(
    (device) => device.label === currentDevice,
  );

  /**
   * Apply theme when component mounts or theme changes
   */
  useEffect(() => {
    switchFormTheme(form.theme);
  }, [form.theme]);

  /**
   * Cleanup form data and errors when component unmounts to prevent stale data on next preview
   */
  useEffect(() => {
    return () => {
      resetFormData();
      setBlockErrors({});
    };
  }, []);

  /**
   * Handles form field value changes
   *
   * @param {string} key - The field key.
   * @param {FormBlockValueType} value - The field value.
   */
  const handleFieldChange = (key: string, value: FormBlockValueType) => {
    updateFormData(key, value);

    // After first submit attempt, revalidate only the changed field in real-time
    if (hasSubmitted) {
      const block = form.blocks.find((b) => getFieldKey(b) === key);
      if (block) {
        const fieldErrors = validateFormBlock(block, value);
        setBlockErrors((prev) => ({
          ...prev,
          [block.id]: fieldErrors,
        }));
      }
    }
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

    if (!isValid) {
      // Count total errors
      const errorCount = Object.values(errors).reduce(
        (sum, errs) => sum + errs.length,
        0,
      );

      toast.error("Form validation failed", {
        description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""} before submitting.`,
      });
    }

    return isValid;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    // Validate form before submission
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Clear any existing errors
    setBlockErrors({});

    try {
      toast.success("Form submitted successfully!", {
        description: "Your response has been recorded.",
      });
    } catch (error) {
      toast.error("Submission failed", {
        description: "An unexpected error occurred. Please try again.",
      });
      console.error("Form submission error:", error);
    }
  };

  /**
   * Handles form reset
   */
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFormData();
    setBlockErrors({});

    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
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
    if (isFieldBasedBlock(block.type)) {
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
    <div
      className="form-container"
      style={{ maxWidth: `${currentDeviceMeta?.size}px` }}
    >
      <div className="form-content">
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
            <FormSubmitControls cta={form.cta} />
          </form>
        )}
      </div>
    </div>
  );
};

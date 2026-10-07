"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FormButton } from "@/design-system/form/FormButton";
import { FormText } from "@/design-system/form/FormText";
import { FormBlock, FormBlockValueType, FormConfig } from "@/lib/types/form";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { FormActionGroup } from "@/components/form/FormActionGroup";
import {
  getFieldKey,
  getPropValue,
  isFieldBasedBlock,
} from "@/lib/utils/formUtils";
import { validateFormBlock } from "@/lib/utils/formValidationUtils";
import { useFormDataStore } from "@/lib/stores/formDataStore";
import { switchFormTheme } from "@/lib/utils/domUtils";
import { sendAnalyticsEvent } from "@/lib/utils/analytics";
import { isFormDataValid } from "@/lib/utils/formValidationUtils";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";

interface PublicFormContentProps {
  form: FormConfig;
}

interface PublicFormStatus {
  type: "editing" | "submitting" | "submitted" | "failed";
  message?: string;
}

export function PublicFormContent({ form }: PublicFormContentProps) {
  const [blockErrors, setBlockErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<PublicFormStatus>({ type: "editing" });
  const hasTrackedViewRef = useRef(false);
  const hasTrackedStartRef = useRef(false);
  const hasTrackedCompletionRef = useRef(false);

  const formData = useFormDataStore((state) => state.formData);
  const updateFormData = useFormDataStore((state) => state.updateFormData);
  const resetFormData = useFormDataStore((state) => state.resetFormData);

  useEffect(() => {
    if (!form.id || !form.theme || hasTrackedViewRef.current) {
      return;
    }
    hasTrackedViewRef.current = true;
    sendAnalyticsEvent(form.id, "view");
    switchFormTheme(form.theme);

    return () => {
      setStatus({ type: "editing" });
      resetFormData();
      setBlockErrors({});
    };
  }, []);

  useEffect(() => {
    if (!form.id || hasTrackedCompletionRef.current) {
      return;
    }

    const isFormCompleted = form.blocks.every((block) => {
      if (!isFieldBasedBlock(block.type) || !getPropValue(block, "required")) {
        return true;
      }
      const value = formData[getFieldKey(block)];
      return isFormDataValid(value);
    });

    // Check if user has filled at least one field with a meaningful value
    const hasFilledAnyField =
      Object.keys(formData).length > 0 &&
      Object.values(formData).some((value) => isFormDataValid(value));

    if (isFormCompleted && hasFilledAnyField) {
      hasTrackedCompletionRef.current = true;
      sendAnalyticsEvent(form.id, "completion");
    }
  }, [formData]);

  const handleFieldChange = (key: string, value: FormBlockValueType) => {
    if (!hasTrackedStartRef.current && form.id) {
      hasTrackedStartRef.current = true;
      sendAnalyticsEvent(form.id, "start");
    }

    updateFormData(key, value);

    const block = form.blocks.find((item) => getFieldKey(item) === key);
    if (block) {
      setBlockErrors((current) => ({
        ...current,
        [block.id]: validateFormBlock(block, value),
      }));
    }
  };

  const validateBlock = (block: FormBlock): string[] => {
    const fieldKey = getFieldKey(block);
    return validateFormBlock(block, formData[fieldKey]);
  };

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string[]> = {};
    let isValid = true;

    form.blocks.forEach((block) => {
      const fieldErrors = validateBlock(block);
      if (fieldErrors.length > 0) {
        isValid = false;
        nextErrors[block.id] = fieldErrors;
      }
    });

    setBlockErrors(nextErrors);
    return isValid;
  };

  const renderFormBlock = (block: FormBlock) => {
    const FormRenderer = widgetBlockRenderers[block.type];

    if (!FormRenderer) {
      return null;
    }

    if (isFieldBasedBlock(block.type)) {
      const InputRenderer = FormRenderer as React.ComponentType<{
        block: FormBlock;
        editable?: boolean;
        value?: FormBlockValueType;
        onChange?: (value: FormBlockValueType) => void;
        errors?: string[];
      }>;

      const fieldKey = getFieldKey(block);

      return (
        <InputRenderer
          key={block.id}
          block={block}
          editable
          value={formData[fieldKey]}
          onChange={(value) => handleFieldChange(fieldKey, value)}
          errors={blockErrors[block.id] || []}
        />
      );
    }

    return <FormRenderer key={block.id} block={block} />;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.id) {
      sendAnalyticsEvent(form.id, "submit_attempt");
    }

    if (!validateForm()) {
      return;
    }

    setStatus({ type: "submitting" });

    try {
      const responses = form.blocks
        .filter((block) => isFieldBasedBlock(block.type))
        .map((block) => ({
          blockId: block.id,
          value: formData[getFieldKey(block)] ?? null,
        }));

      const response = await fetch(`/api/forms/${form.id}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error?.message || "Failed to submit form");
      }

      resetFormData();
      setBlockErrors({});

      setStatus({ type: "submitted", message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Submission error:", error);

      setStatus({
        type: "failed",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    }
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFormData();
    setBlockErrors({});
  };

  const handleSubmitAnotherResponse = () => {
    if (form.id) {
      sendAnalyticsEvent(form.id, "view");
    }

    hasTrackedStartRef.current = false;
    hasTrackedCompletionRef.current = false;
    setStatus({ type: "editing" });
  };

  const retryFormAfterFailure = () => {
    setStatus({ type: "editing" });
  };

  return (
    <FormThemeContainer theme={form.theme}>
      {/* Form */}
      <div className="form-content">
        {status.type === "submitting" && (
          <div className="form-overlay">
            <FormText>Submitting form...</FormText>
          </div>
        )}
        {/* Form Blocks */}
        {form.blocks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <FormText variant="h3">Empty form</FormText>
            <FormText variant="p" className="text-sm @sm:text-sm @5xl:text-sm">
              Please add widgets from the form builder.
            </FormText>
          </div>
        ) : (
          <>
            {(status.type === "editing" || status.type === "submitting") && (
              <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
                {form.blocks.map((block) => renderFormBlock(block))}
                <FormActionGroup actions={form.actions} />
              </form>
            )}
            {status.type === "submitted" && (
              <div className="p-4 text-center">
                <FormText variant="h3">Thank you!</FormText>
                <FormText variant="p">{status.message}</FormText>
                <div className="flex gap-3 justify-center mt-4">
                  <FormButton
                    variant="solid"
                    color="primary"
                    onClick={handleSubmitAnotherResponse}
                  >
                    Submit another
                  </FormButton>
                  <Link href="/forms">
                    <FormButton variant="outline" color="secondary">
                      Go Home
                    </FormButton>
                  </Link>
                </div>
              </div>
            )}
            {status.type === "failed" && (
              <div className="p-4 text-center">
                <FormText variant="h3">Error</FormText>
                <FormText variant="p">{status.message}</FormText>
                <div className="flex gap-3 justify-center mt-4">
                  <FormButton
                    variant="solid"
                    color="primary"
                    onClick={retryFormAfterFailure}
                  >
                    Retry
                  </FormButton>
                  <Link href="/forms">
                    <FormButton variant="outline" color="secondary">
                      Go Home
                    </FormButton>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </FormThemeContainer>
  );
}

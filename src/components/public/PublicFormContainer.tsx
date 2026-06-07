"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { FormBlock, FormBlockValueType } from "@/lib/types/form";
import { widgetBlockRenderers } from "@/components/form/blocks";
import {
  validateFormBlock,
  isInputBlockType,
} from "@/lib/utils/formValidationUtils";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { useFormDataStore } from "@/lib/stores/formDataStore";
import { getFieldKey } from "@/lib/utils/formUtils";
import { switchFormTheme } from "@/lib/utils/domUtils";

interface PublicFormContainerProps {
  form: {
    id: string;
    title: string;
    description: string | null;
    theme: string;
    blocks: FormBlock[];
  };
}

export function PublicFormContainer({ form }: PublicFormContainerProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [blockErrors, setBlockErrors] = useState<Record<string, string[]>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formData = useFormDataStore((state) => state.formData);
  const updateFormData = useFormDataStore((state) => state.updateFormData);
  const resetFormData = useFormDataStore((state) => state.resetFormData);

  useEffect(() => {
    switchFormTheme(form.theme);
  }, [form.theme]);

  useEffect(() => {
    return () => {
      resetFormData();
      setBlockErrors({});
    };
  }, [resetFormData]);

  const handleFieldChange = (key: string, value: FormBlockValueType) => {
    updateFormData(key, value);

    if (hasSubmitted) {
      const block = form.blocks.find((b) => getFieldKey(b) === key);
      if (block) {
        setBlockErrors((prev) => ({
          ...prev,
          [block.id]: validateFormBlock(block, value),
        }));
      }
    }
  };

  const validateBlock = (block: FormBlock): string[] => {
    const fieldKey = getFieldKey(block);
    return validateFormBlock(block, formData[fieldKey]);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string[]> = {};
    let isValid = true;

    form.blocks.forEach((block) => {
      const fieldErrors = validateBlock(block);
      if (fieldErrors.length > 0) {
        isValid = false;
        errors[block.id] = fieldErrors;
      }
    });

    setBlockErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setHasSubmitted(true);
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const responses = form.blocks
        .filter((block) => isInputBlockType(block.type))
        .map((block) => ({
          blockId: block.id,
          value: formData[getFieldKey(block)] ?? null,
        }));

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: form.id,
          responses,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      resetFormData();
      setBlockErrors({});

      router.push(`/f/${form.id}/success`);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit form",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFormData();
    setBlockErrors({});
    setSubmitError(null);
    setHasSubmitted(false);
  };

  const renderFormBlock = (block: FormBlock): JSX.Element | null => {
    const FormRenderer = widgetBlockRenderers[block.type];
    if (!FormRenderer) return null;

    if (isInputBlockType(block.type)) {
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
          onChange={(value: FormBlockValueType) =>
            handleFieldChange(fieldKey, value)
          }
          errors={blockErrors[block.id] || []}
        />
      );
    }

    return <FormRenderer key={block.id} block={block} />;
  };

  return (
    <div
      className="min-h-screen bg-background p-4 md:p-8"
      data-theme={form.theme}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Form */}
        <Card>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className="space-y-6"
              noValidate
            >
              {/* Form Blocks */}
              <div className="space-y-4">
                {form.blocks.map((block) => renderFormBlock(block))}
              </div>

              {/* Submit Error */}
              {submitError && <ErrorMessages errors={[submitError]} />}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

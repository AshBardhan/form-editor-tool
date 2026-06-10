"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormConfig } from "@/lib/types/form";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { validateFormBlock } from "@/lib/utils/formValidationUtils";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { useFormDataStore } from "@/lib/stores/formDataStore";
import { useFormBlockValidationStore } from "@/lib/stores/formBlockValidationStore";

interface PublicFormContainerProps {
  form: FormConfig;
}

export function PublicFormContainer({ form }: PublicFormContainerProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formData = useFormDataStore((state) => state.formData);
  const resetFormData = useFormDataStore((state) => state.resetFormData);

  const formBlockErrors = useFormBlockValidationStore(
    (state) => state.formBlockErrors,
  );
  const updateFormBlockErrors = useFormBlockValidationStore(
    (state) => state.updateFormBlockErrors,
  );
  const clearAllFormBlockErrors = useFormBlockValidationStore(
    (state) => state.clearAllFormBlockErrors,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all form blocks
    const errors: Record<string, string[]> = {};
    let hasErrors = false;

    form.blocks.forEach((block) => {
      const blockErrors = validateFormBlock(block, formData[block.name]);
      if (blockErrors.length > 0) {
        errors[block.id] = blockErrors;
        hasErrors = true;
      }
    });

    // Update errors in store
    Object.entries(errors).forEach(([blockId, blockErrors]) => {
      updateFormBlockErrors(blockId, blockErrors);
    });

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const responses = form.blocks
        .filter((block) =>
          [
            "text",
            "number",
            "email",
            "url",
            "password",
            "textarea",
            "select",
            "radio",
            "checkbox",
          ].includes(block.type),
        )
        .map((block) => ({
          blockId: block.id,
          value: formData[block.name] ?? null,
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

      // Clear form data and errors
      resetFormData();
      clearAllFormBlockErrors();

      // Redirect to success page
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

  const handleReset = () => {
    resetFormData();
    clearAllFormBlockErrors();
    setSubmitError(null);
  };

  return (
    <div
      className="min-h-screen bg-background p-4 md:p-8"
      data-theme={form.theme}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Form Header */}
        <div className="space-y-2">
          <Text variant="h2" className="text-foreground">
            {form.title}
          </Text>
          {form.description && (
            <Text className="text-muted-foreground">{form.description}</Text>
          )}
        </div>

        {/* Form */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Blocks */}
              <div className="space-y-4">
                {form.blocks.map((block) => {
                  const BlockComponent = widgetBlockRenderers[block.type];
                  return BlockComponent ? (
                    <div key={block.id}>
                      <BlockComponent block={block} />
                      {formBlockErrors[block.id] &&
                        formBlockErrors[block.id].length > 0 && (
                          <ErrorMessages errors={formBlockErrors[block.id]} />
                        )}
                    </div>
                  ) : null;
                })}
              </div>

              {/* Submit Error */}
              {submitError && <ErrorMessages errors={[submitError]} />}

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

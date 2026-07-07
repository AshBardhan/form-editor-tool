"use client";

import { JSX, useCallback, useEffect, useMemo } from "react";
import { FormConfig } from "@/lib/types/form";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";

interface FormBuilderContainerProps {
  form: FormConfig;
}

/**
 * Form Builder Container
 * - Receives form data from server component
 * - Initializes Zustand store with form data
 * - Auto-saves changes with debouncing
 */
export const FormBuilderContainer = ({
  form,
}: FormBuilderContainerProps): JSX.Element => {
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

  // Determine if form is editable based on status and submission count
  const isFormEditable = useMemo(() => {
    switch (formConfig.status) {
      case "archived":
        return false;
      case "published":
        return (formConfig.submissionCount ?? 0) === 0;
      default:
        return true;
    }
  }, [formConfig.status, formConfig.submissionCount]);

  const handleSave = useCallback(async (form: FormConfig) => {
    const toastId = toast.info("Saving changes...", {
      duration: Infinity,
      dismissible: false,
    });

    try {
      const response = await fetch(`/api/forms/${form.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message ?? "Failed to save form.");
      }

      toast.update(toastId, {
        type: "success",
        title: "Changes saved",
        duration: 2000,
      });
    } catch (err) {
      toast.update(toastId, {
        type: "error",
        title: "Failed to save",
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, []);

  // Generic auto-save hook (enabled only for editable forms)
  // Custom equality checks ONLY user-editable fields to prevent infinite loops
  // when server returns updated metadata (submissionCount, etc.)
  useAutoSave({
    data: formConfig,
    onSave: handleSave,
    enabled: isFormEditable && !!formConfig.id,
    debounceMs: 1000,
    isEqual: (a, b) => {
      // Only compare fields that users actually edit
      // Ignore metadata fields that server might update
      return (
        a.title === b.title &&
        a.description === b.description &&
        a.theme === b.theme &&
        JSON.stringify(a.blocks) === JSON.stringify(b.blocks)
      );
    },
  });

  useEffect(() => {
    setFormConfig(form);
    return () => {
      resetFormConfig();
      resetSidebar();
    };
  }, [form]);

  return (
    <div className="flex h-full relative">
      <FormBuilderContent />
      {!isFormEditable && (
        <div className="absolute inset-0 bg-white/20 z-50 cursor-not-allowed flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Form Uneditable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formConfig.status === "archived"
                ? "This form is archived and cannot be edited. Restore it to 'published' status to make changes."
                : "This form has submissions and cannot be edited. Archive it first if you need to make changes."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

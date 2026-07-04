"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { FormConfig } from "@/lib/types/form";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";

interface FormBuilderContainerProps {
  form: FormConfig;
}

/**
 * Form Builder Container
 * - Receives form data from server component
 * - Initializes Zustand store with form data
 */
export const FormBuilderContainer = ({
  form,
}: FormBuilderContainerProps): JSX.Element => {
  const router = useRouter();
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);
  const [isPersisting, setIsPersisting] = useState(false);
  const [persistMessage, setPersistMessage] = useState("");

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

  const handleCancel = () => {
    if (!isPersisting) {
      router.push("/");
    }
  };

  const handleSave = async () => {
    if (!formConfig.id) {
      toast.error("Save unavailable", {
        description: "Form ID is missing.",
      });
      return;
    }

    if (!isFormEditable) {
      const message =
        formConfig.status === "archived"
          ? "Archived forms cannot be edited. Restore it to 'published' first."
          : "Cannot edit published form with submissions. Archive the form first if you need to make changes.";
      toast.error("Unable to update form", {
        description: message,
      });
      return;
    }

    setPersistMessage("Updating form...");
    setIsPersisting(true);

    try {
      const payload = {
        title: formConfig.title,
        theme: formConfig.theme,
        blocks: formConfig.blocks.map((block) => ({
          id: block.id,
          type: block.type,
          name: block.name,
          props: block.props,
        })),
      };

      const response = await fetch(`/api/forms/${formConfig.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;
      if (!response.ok) {
        throw new Error(
          result.error?.message || "Unable to save form right now.",
        );
      }

      if (!result.success || !result.data) {
        throw new Error("Unexpected response from server.");
      }

      const savedForm = result.data;
      setFormConfig(savedForm);

      toast.success("Changes updated", {
        description: "Latest edits are now saved to this form.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not save your changes. Please try again.";

      toast.error("Save failed", {
        description: message,
      });
    } finally {
      setIsPersisting(false);
      setPersistMessage("");
    }
  };

  useEffect(() => {
    setFormConfig(form);
    return () => {
      resetFormConfig();
      resetSidebar();
    };
  }, [form]);

  return (
    <div className="flex h-full relative">
      <FormBuilderContent onSave={handleSave} onCancel={handleCancel} />
      {isPersisting && (
        <div className="form-overlay">
          <div className="text-3xl font-medium">{persistMessage}</div>
        </div>
      )}
      {!isFormEditable && (
        <div className="form-overlay cursor-not-allowed">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Form Uneditable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formConfig.status === "archived"
                ? "This form is archived and cannot be edited. Restore it to 'published' status and clear report to make changes."
                : "This form has submissions and cannot be edited. Clear report first to make changes."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

"use client";

import { JSX, useEffect, useState } from "react";
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
  const formIdentifier = formConfig.slug ?? formConfig.id;

  const handleCancel = () => {
    if (!isPersisting) {
      router.push("/");
    }
  };

  const handleSave = async () => {
    if (!formIdentifier) {
      toast.error("Save unavailable", {
        description: "Form identifier is missing.",
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

      const response = await fetch(`/api/forms/${formIdentifier}`, {
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
    <div className="flex h-full">
      <FormBuilderContent
        isPersisting={isPersisting}
        persistMessage={persistMessage}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

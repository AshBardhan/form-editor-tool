"use client";

import { JSX, useEffect, useState } from "react";
import { FormConfig, FormStatus } from "@/lib/types/form";
import { FORM_STATUS_UPDATE_MESSAGES } from "@/lib/constants/form";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { Header } from "@/components/layout/Header";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { PageContent } from "@/components/layout/PageContent";
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
    const isNewForm = !formConfig.id;
    setPersistMessage(isNewForm ? "Saving form..." : "Updating form...");
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

      const response = await fetch(
        isNewForm ? "/api/forms" : `/api/forms/${formIdentifier}`,
        {
          method: isNewForm ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

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

      if (isNewForm && savedForm.slug) {
        router.replace(`/forms/${savedForm.slug}/builder`);
      }

      toast.success(isNewForm ? "Draft saved" : "Changes updated", {
        description: isNewForm
          ? "Your form is saved and ready for publishing when you are."
          : "Latest edits are now saved to this form.",
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

  const handleDelete = async () => {
    if (!formConfig.id || !formIdentifier) {
      toast.error("Delete unavailable", {
        description: "Save this form first before deleting it.",
      });
      return;
    }

    setPersistMessage("Deleting form...");
    setIsPersisting(true);

    try {
      const response = await fetch(`/api/forms/${formIdentifier}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as ApiResponse<{ id: string }>;
      if (!response.ok) {
        throw new Error(
          result.error?.message || "Unable to delete form right now.",
        );
      }

      if (!result.success) {
        throw new Error("Unexpected response from server.");
      }

      router.push("/forms");
      toast.success("Form permanently deleted", {
        description: "The form and its submission reports were removed.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not delete the form. Please try again.";

      toast.error("Delete failed", {
        description: message,
      });
      setIsPersisting(false);
      setPersistMessage("");
    }
  };

  const handleUpdateFormStatus = async (nextStatus: FormStatus) => {
    if (!formConfig.id || !formIdentifier) {
      toast.error("Publish unavailable", {
        description: "Save this form first before changing publish status.",
      });
      return;
    }

    const messages = FORM_STATUS_UPDATE_MESSAGES[nextStatus];
    setPersistMessage(messages.transitioning);
    setIsPersisting(true);

    try {
      const response = await fetch(`/api/forms/${formIdentifier}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;
      if (!response.ok) {
        throw new Error(result.error?.message || messages.error.description);
      }

      if (!result.success || !result.data) {
        throw new Error("Unexpected response from server.");
      }

      setFormConfig(result.data);

      toast.success(messages.success.title, {
        description: messages.success.description,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : messages.error.description;

      toast.error(messages.error.title, {
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
    <>
      <Header>
        <FormBuilderHeader
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onUpdateFormStatus={handleUpdateFormStatus}
          isSubmitting={isPersisting}
        />
      </Header>
      <PageContent>
        <FormBuilderContent
          isPersisting={isPersisting}
          persistMessage={persistMessage}
        />
      </PageContent>
    </>
  );
};

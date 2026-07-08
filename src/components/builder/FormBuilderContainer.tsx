"use client";

import { JSX, useEffect } from "react";
import { FormConfig } from "@/lib/types/form";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";

interface FormBuilderContainerProps {
  form: FormConfig;
}

/**
 * Form Builder Container
 * - Receives initial form data from server component
 * - Initializes Zustand store with form data
 * - Cleans up on unmount
 */
export const FormBuilderContainer = ({
  form,
}: FormBuilderContainerProps): JSX.Element => {
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

  // Initialize store with server data on mount
  useEffect(() => {
    setFormConfig(form);
    return () => {
      resetFormConfig();
      resetSidebar();
    };
  }, [form]);

  return <FormBuilderContent />;
};

"use client";


import { JSX, useEffect } from "react";
import { FormConfig } from "@/lib/types/form";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { Header } from "@/components/layout/Header";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { PageContent } from "@/components/layout/PageContent";

interface FormBuilderContainerProps {
  form: FormConfig;
}

/**
 * Form Builder Container
 * - Receives form data from server component
 * - Initializes Zustand store with form data
 */
export const FormBuilderContainer = ({ form }: FormBuilderContainerProps): JSX.Element => {
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

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
        <FormBuilderHeader />
      </Header>
      <PageContent>
        <FormBuilderContent />
      </PageContent>
    </>
  );
};

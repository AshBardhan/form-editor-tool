"use client";

import { JSX, useEffect } from "react";
import { FormConfig } from "@/lib/types/form";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { useFetch } from "@/lib/hooks/useFetch";
import { Header } from "@/components/layout/Header";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { PageContent } from "@/components/layout/PageContent";

interface FormBuilderContainerProps {
  id?: string;
}

/**
 * Form Builder Container
 * - Renders the form with prefilled data fetched from API if an 'id' is provided. Otherwise, renders an empty form.
 * - Switches the theme of the page based on the form config.
 * - Handles errors and loading states.
 * - Clears localStorage when opening new form or existing form pages
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const setForm = useFormConfigStore((state) => state.setForm);
  const resetForm = useFormConfigStore((state) => state.resetForm);
  const storedFormId = useFormConfigStore((state) => state.formId);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

  const { data, loading, error } = useFetch<FormConfig>(
    id ? `/api/form/${id}` : "",
  );

  // Clear existing form config data when opening new form page
  useEffect(() => {
    if (!id && storedFormId !== null) {
      // Opening /forms/new but localStorage has data from an existing form
      // Clear it to start fresh
      resetForm();
    }
  }, [id, storedFormId, resetForm]);

  useEffect(() => {
    console.log("trigger", data);
    if (data) {
      // For existing forms: load data from API and override localStorage
      setForm(data, id);
      switchTheme(data.theme);
    }

    return () => {
      // Don't reset form config - let localStorage persistence handle it
      // Only reset UI state and theme
      resetSidebar();
      switchTheme("");
    };
  }, [data, setForm, id, resetSidebar]);

  if (loading) {
    return (
      <div className="empty-content gap-4">
        <LoaderCircleIcon className="size-10 animate-spin" />
        <span className="text-2xl">Loading Form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-content flex-col gap-3">
        <h2 className="text-lg font-semibold">Unable to load form</h2>
        <p className="text-sm">
          Please check the form ID or go back to home page.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header>
        <FormBuilderHeader formId={id} />
      </Header>
      <PageContent>
        <FormBuilderContent />
      </PageContent>
    </>
  );
};

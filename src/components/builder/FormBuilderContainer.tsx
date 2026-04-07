"use client";

import { JSX, useEffect } from "react";
import { FormData } from "@/lib/types/form";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { useFormDataStore, useUIStateStore } from "@/lib/stores";
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
 * - Switches the theme of the page based on the form data.
 * - Handles errors and loading states.
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const setForm = useFormDataStore((state) => state.setForm);
  const resetForm = useFormDataStore((state) => state.resetForm);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

  const { data, loading, error } = useFetch<FormData>(
    id ? `/api/form/${id}` : "",
  );

  useEffect(() => {
    console.log("trigger", data);
    if (data) {
      setForm(data);
      switchTheme(data.theme);
    }

    return () => {
      resetForm();
      resetSidebar();
      switchTheme("");
    };
  }, [data, setForm, resetForm, resetSidebar]);

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
        <FormBuilderHeader />
      </Header>
      <PageContent>
        <FormBuilderContent />
      </PageContent>
    </>
  );
};

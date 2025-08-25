"use client";

import { JSX, useEffect } from "react";
import { FormData } from "@/types/form-field";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { useFormDataStore } from "@/lib/stores";
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
 * - Prefills the form data store with the form data from the API if an 'id' is provided.
 * - Switches the theme of the page based on the form data.
 * - Handles errors and loading states.
 * - Renders empty form builder when no 'id' is provided.
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const setForm = useFormDataStore((state) => state.setForm);
  const resetForm = useFormDataStore((state) => state.resetForm);

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
      switchTheme("");
    };
  }, [data, setForm, resetForm]);

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center gap-4">
        <LoaderCircleIcon className="size-10 animate-spin" />
        <span className="text-2xl">Loading Form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content flex items-center justify-center text-red-600 flex-col gap-3">
        <p className="text-lg font-semibold">{error.message}</p>
        <p className="text-sm text-gray-500">
          Please check the form ID or go back to hoome page.
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

export { FormBuilderContainer };

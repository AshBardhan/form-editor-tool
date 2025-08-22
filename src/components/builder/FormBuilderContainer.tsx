"use client";

import { JSX, useEffect, useState } from "react";
import { FormData } from "@/types/form-field";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { Header } from "@/components/layout/Header";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { useFormDataStore, useUIStateStore } from "@/lib/stores";
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
  const loading = useUIStateStore((state) => state.loading);
  const setLoading = useUIStateStore((state) => state.setLoading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/form/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load form`);
        }
        const form: FormData = await response.json();
        setForm(form);
        switchTheme(form.theme);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      resetForm();
      setLoading(false);
      setError(null);
      switchTheme("");
    };
  }, [id]);

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
        <p className="text-lg font-semibold">{error}</p>
        <p className="text-sm text-gray-500">
          Please check the form ID or go back.
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

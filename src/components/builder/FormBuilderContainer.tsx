"use client";

import { JSX, useEffect, useState } from "react";
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
 * - Smart loading: Uses localStorage when form.id matches route id (instant load)
 * - Fetches from API only when needed (mismatch, first visit, or direct URL)
 * - Handles new and existing forms with proper state management
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { data, loading, error } = useFetch<FormConfig>(
    shouldFetch && id ? `/api/form/${id}` : "",
  );

  // Smart loading logic
  useEffect(() => {
    // Case 1: New form (no id)
    if (!id) {
      // If stored form has an id, it's from a different form → reset
      if (formConfig.id) {
        resetFormConfig();
      }
      // Otherwise use localStorage (new form in progress)
      setIsReady(true);
      return;
    }

    // Case 2: Existing form - check if localStorage matches
    if (formConfig.id === id) {
      // Match → Use localStorage, no fetch needed (instant load)
      setIsReady(true);
      return;
    }

    // Case 3: Mismatch or empty → Fetch from API
    setShouldFetch(true);
  }, [id, formConfig.id, resetFormConfig]);

  // Update store when API data arrives
  useEffect(() => {
    if (data) {
      setFormConfig(data);
      setShouldFetch(false);
      setIsReady(true);
    }
  }, [data, setFormConfig]);

  // Apply theme from store
  useEffect(() => {
    if (isReady) {
      switchTheme(formConfig.theme);
    }

    return () => {
      resetSidebar();
      switchTheme("");
    };
  }, [isReady, formConfig.theme, resetSidebar]);

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

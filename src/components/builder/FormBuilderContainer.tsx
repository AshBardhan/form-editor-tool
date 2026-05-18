"use client";

import { JSX, useEffect } from "react";
import { FormConfig } from "@/lib/types/form";
import { LoaderCircleIcon } from "lucide-react";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { useFetch } from "@/lib/hooks/useFetch";
import { Header } from "@/components/layout/Header";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { FormBuilderContent } from "@/components/builder/FormBuilderContent";
import { PageContent } from "@/components/layout/PageContent";

interface FormBuilderContainerProps {
  id?: string;
}

const FormLoading = () => (
  <div className="empty-content gap-4">
    <LoaderCircleIcon className="size-10 animate-spin" />
    <span className="text-2xl">Loading Form...</span>
  </div>
);

const FormError = () => (
  <div className="empty-content flex-col gap-3">
    <h2 className="text-lg font-semibold">Unable to load form</h2>
    <p className="text-sm">Please check the form ID or go back to home page.</p>
  </div>
);

/**
 * Form Builder Container
 * - Fetches form from API when route id doesn't match store id
 * - Handles new and existing forms with simple in-memory state
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const formId = useFormConfigStore((state) => state.formConfig.id);
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetSidebar = useUIStateStore((state) => state.resetSidebar);

  // Fetch when route id doesn't match store id
  const needsFetch = id && formId !== id;
  const { data, loading, error } = useFetch<FormConfig>(
    needsFetch ? `/api/form/${id}` : "",
  );

  // Initialize or update form data
  useEffect(() => {
    // New form: reset if store has stale data
    if (!id && formId) {
      resetFormConfig();
      return;
    }

    // Update store when API data arrives
    if (data) {
      setFormConfig(data);
    }
  }, [id, data, formId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetFormConfig();
      resetSidebar();
    };
  }, []);

  if (loading) return <FormLoading />;
  if (error) return <FormError />;

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

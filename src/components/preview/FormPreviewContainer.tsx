"use client";

import { JSX, useEffect, useState } from "react";
import { FormConfig } from "@/lib/types/form";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { useFetch } from "@/lib/hooks/useFetch";
import { Header } from "@/components/layout/Header";
import { FormPreviewHeader } from "@/components/preview/FormPreviewHeader";
import { FormPreview } from "@/components/preview/FormPreview";
import { PageContent } from "@/components/layout/PageContent";

interface FormPreviewContainerProps {
  id: string;
}

/**
 * Form Preview Container
 * - Fetches and displays the form in interactive preview mode
 * - Handles loading and error states
 *
 * @param {FormPreviewContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewContainer = ({
  id,
}: FormPreviewContainerProps): JSX.Element => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);

  const { data, loading, error } = useFetch<FormConfig>(`/api/form/${id}`);

  useEffect(() => {
    if (data) {
      setFormConfig(data);
      switchTheme(data.theme);
    }

    return () => {
      switchTheme("");
    };
  }, [data]);

  if (loading) {
    return (
      <div className="empty-content gap-4">
        <LoaderCircleIcon className="size-10 animate-spin" />
        <span className="text-2xl">Loading Form Preview...</span>
      </div>
    );
  }

  if (error || !formConfig) {
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
        <FormPreviewHeader formTitle={formConfig.title} formId={id} />
      </Header>
      <PageContent>
        <FormPreview form={formConfig} editable={true} />
      </PageContent>
    </>
  );
};

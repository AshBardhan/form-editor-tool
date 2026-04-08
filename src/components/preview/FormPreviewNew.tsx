"use client";

import { JSX, useEffect } from "react";
import { useFormConfigStore } from "@/lib/stores";
import { switchTheme } from "@/lib/utils/domUtils";
import { Header } from "@/components/layout/Header";
import { FormPreviewHeader } from "@/components/preview/FormPreviewHeader";
import { FormPreview } from "@/components/preview/FormPreview";
import { PageContent } from "@/components/layout/PageContent";

/**
 * Form Preview for New Forms
 * - Displays the form being created in preview mode
 * - Uses formConfigStore instead of fetching from API
 * - Clears existing form config if localStorage contains data from an existing form
 *
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewNew = (): JSX.Element => {
  const form = useFormConfigStore((state) => state.form);
  const formId = useFormConfigStore((state) => state.formId);
  const resetForm = useFormConfigStore((state) => state.resetForm);

  // Clear existing form config when previewing new form
  useEffect(() => {
    if (formId !== null) {
      // localStorage has config data from an existing form (formId is not null)
      // Clear it since we're previewing a new form
      resetForm();
    }
  }, [formId, resetForm]);

  useEffect(() => {
    switchTheme(form.theme);

    return () => {
      switchTheme("");
    };
  }, [form.theme]);

  return (
    <>
      <Header>
        <FormPreviewHeader formTitle={form.title} />
      </Header>
      <PageContent>
        <FormPreview form={form} editable={true} />
      </PageContent>
    </>
  );
};

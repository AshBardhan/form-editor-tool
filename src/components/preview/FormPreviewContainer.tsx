"use client";

import { JSX, useEffect, useState } from "react";
import { FormConfig } from "@/lib/types/form";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";
import { useFetch } from "@/lib/hooks/useFetch";
import { useFormConfigStore, useFormDataStore } from "@/lib/stores";
import { Header } from "@/components/layout/Header";
import { FormPreviewHeader } from "@/components/preview/FormPreviewHeader";
import { FormPreviewContent } from "@/components/preview/FormPreviewContent";
import { PageContent } from "@/components/layout/PageContent";
import { DeviceSelector } from "@/components/layout/DeviceSelector";
import { DeviceType } from "@/lib/constants/device";

interface FormPreviewContainerProps {
  id?: string;
}

/**
 * Form Preview Container
 * - Smart loading: Uses localStorage when form.id matches route id (instant load)
 * - Fetches from API only when needed (mismatch, first visit, or direct URL)
 * - Handles new and existing forms with proper state management
 *
 * @param {FormPreviewContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewContainer = ({
  id,
}: FormPreviewContainerProps): JSX.Element => {
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const resetFormConfig = useFormConfigStore((state) => state.resetFormConfig);
  const resetFormData = useFormDataStore((state) => state.resetFormData);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(
    DeviceType.DESKTOP,
  );

  // Conditionally fetch only when needed
  const { data, loading, error } = useFetch<FormConfig>(
    shouldFetch && id ? `/api/form/${id}` : "",
  );

  // Reset form data on mount to ensure clean preview state
  useEffect(() => {
    resetFormData();
  }, []);

  // Smart loading logic
  useEffect(() => {
    // Case 1: New form (no id)
    if (!id) {
      // If stored form has an id, it's from a different form → reset
      if (formConfig.id) {
        resetFormConfig();
      }
      // Otherwise use localStorage (new form in progress)
      setShouldRender(true);
      return;
    }

    // Case 2: Existing form - check if localStorage matches
    if (formConfig.id === id) {
      // Match → Use localStorage, no fetch needed (instant load)
      setShouldRender(true);
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
      setShouldRender(true);
    }
  }, [data, setFormConfig]);

  // Apply theme
  useEffect(() => {
    if (formConfig) {
      switchTheme(formConfig.theme);
    }
    return () => {
      switchTheme("");
    };
  }, [formConfig?.theme]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircleIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <p className="text-base text-red-600">Failed to load form</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  // Not ready to render yet
  if (!shouldRender) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircleIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <Header>
        <FormPreviewHeader formTitle={formConfig.title} formId={id} />
      </Header>
      <PageContent>
        <div className="relative w-full h-full">
          <DeviceSelector
            currentDevice={currentDevice}
            onDeviceChange={setCurrentDevice}
          />
          <FormPreviewContent
            form={formConfig}
            editable={true}
            currentDevice={currentDevice}
          />
        </div>
      </PageContent>
    </>
  );
};

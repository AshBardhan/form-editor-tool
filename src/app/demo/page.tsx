"use client";

import { useState } from "react";
import {
  AppAlertDemo,
  AppBadgeDemo,
  AppButtonDemo,
  AppCardDemo,
  AppCheckboxDemo,
  AppCheckboxGroupDemo,
  AppInputDemo,
  AppLabelDemo,
  AppMenuDemo,
  AppMetricDemo,
  AppModalDemo,
  AppNavigationTabsDemo,
  AppRadioGroupDemo,
  AppSelectDemo,
  AppSeparatorDemo,
  AppSkeletonDemo,
  AppSwitchDemo,
  AppTableDemo,
  AppTextAreaDemo,
  AppTextDemo,
  AppToastDemo,
  AppToggleGroupDemo,
} from "@/components/demos/app";
import {
  FormButtonDemo,
  FormCheckboxDemo,
  FormCheckboxGroupDemo,
  FormErrorDemo,
  FormInputDemo,
  FormLabelDemo,
  FormRadioGroupDemo,
  FormSelectDemo,
  FormSeparatorDemo,
  FormSwitchDemo,
  FormTextAreaDemo,
  FormTextDemo,
} from "@/components/demos/form";
import { AppSelect } from "@/design-system/app/AppSelect";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import {
  APP_THEME_LABELS,
  FORM_THEMES,
  FORM_THEME_LABELS,
} from "@/lib/constants/themes";
import type { FormTheme } from "@/lib/types/themes";
import { PageContainer, PageContent, PageHeader } from "@/components/layout";
import { useUIStateStore } from "@/lib/stores/UIStateStore";

/**
 * Design System Components Demo
 *
 * Two-column layout showcasing derived components:
 * - Left column: App-wide components
 * - Right column: Form-specific components
 *
 * App theme is switched from AppHeader. Form theme is selected locally
 * and applied through FormThemeContainer.
 */
export default function ComponentsDemo() {
  const [formTheme, setFormTheme] = useState<FormTheme>("light");
  const appTheme = useUIStateStore((state) => state.appTheme);

  return (
    <>
      <PageHeader>
        <PageContainer>
          <h1 className="text-4xl font-bold text-app-fg-heading mb-2">
            Design System Components
          </h1>
          <p className="text-app-fg-muted">
            Derived components with theme-aware styling and comprehensive
            variants
          </p>
        </PageContainer>
      </PageHeader>

      <PageContent>
        <PageContainer className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-app-fg-heading mb-2">
                    App Components
                  </h2>
                  <p className="text-sm text-app-fg-muted">
                    Core components for application-wide usage
                  </p>
                </div>

                <div className="flex flex-col gap-1 items-end justify-end">
                  <span className="text-xs font-semibold text-app-fg-muted">
                    App Theme
                  </span>
                  <span className="text-sm font-medium text-app-fg">
                    {APP_THEME_LABELS[appTheme]}
                  </span>
                </div>
              </div>
              <div className="bg-app-surface p-6 rounded-lg border border-app-border-subtle">
                <div className="flex flex-col gap-12">
                  <AppTextDemo />
                  <AppButtonDemo />
                  <AppInputDemo />
                  <AppTextAreaDemo />
                  <AppSelectDemo />
                  <AppLabelDemo />
                  <AppCheckboxDemo />
                  <AppCheckboxGroupDemo />
                  <AppRadioGroupDemo />
                  <AppSwitchDemo />
                  <AppToggleGroupDemo />
                  <AppMenuDemo />
                  <AppModalDemo />
                  <AppToastDemo />
                  <AppAlertDemo />
                  <AppBadgeDemo />
                  <AppMetricDemo />
                  <AppCardDemo />
                  <AppSeparatorDemo />
                  <AppTableDemo />
                  <AppNavigationTabsDemo />
                  <AppSkeletonDemo />
                </div>
              </div>
            </div>

            <FormThemeContainer
              theme={formTheme}
              className="p-0 block bg-transparent"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-app-fg-heading mb-2">
                      Form Components
                    </h2>
                    <p className="text-sm text-app-fg-muted">
                      Form-specific components with theme variants
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end justify-end">
                    <span className="text-xs font-semibold text-app-fg-muted">
                      Form Theme
                    </span>
                    <AppSelect
                      className="w-40"
                      items={FORM_THEMES.map((theme) => ({
                        value: theme,
                        label: FORM_THEME_LABELS[theme],
                      }))}
                      value={formTheme}
                      onValueChange={(value) => {
                        if (!value) return;
                        setFormTheme(value as FormTheme);
                      }}
                    />
                  </div>
                </div>
                <div className="bg-form-surface p-6 rounded-lg border border-form-border-subtle">
                  <div className="flex flex-col gap-12">
                    <FormTextDemo />
                    <FormButtonDemo />
                    <FormInputDemo />
                    <FormTextAreaDemo />
                    <FormSelectDemo />
                    <FormLabelDemo />
                    <FormCheckboxDemo />
                    <FormCheckboxGroupDemo />
                    <FormRadioGroupDemo />
                    <FormSwitchDemo />
                    <FormSeparatorDemo />
                    <FormErrorDemo />
                  </div>
                </div>
              </div>
            </FormThemeContainer>
          </div>

          <div className="mt-16 pt-8 border-t border-app-border-subtle">
            <p className="text-sm text-app-fg-muted">
              All components use CSS variables for theming. Switch the app theme
              from the header, or change the form theme in this column, to see
              automatic styling updates without code changes.
            </p>
          </div>
        </PageContainer>
      </PageContent>
    </>
  );
}

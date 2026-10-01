"use client";

import { useState } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { FormButton } from "@/design-system/form/FormButton";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { AppThemeSwitcher } from "@/components/layout/AppThemeSwitcher";
import { FormThemeSelector } from "@/components/layout/FormThemeSelector";
import type { FormTheme } from "@/lib/types/themes";

/**
 * Design System Components Demo
 *
 * Two-column layout showcasing derived components:
 * - Left column: App-wide components (AppButton)
 * - Right column: Form-specific components (FormButton)
 *
 * Uses theme containers to enable live theme switching:
 * - AppThemeContainer wraps app components and hydrates app theme
 * - FormThemeContainer wraps form components with selected form theme
 */
export default function ComponentsDemo() {
  const [formTheme, setFormTheme] = useState<FormTheme>("light");

  return (
    <AppThemeContainer className="min-h-screen bg-app-canvas text-app-fg">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-app-fg-heading mb-2">
                Design System Components
              </h1>
              <p className="text-app-fg-muted">
                Derived components with theme-aware styling and comprehensive
                variants
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-app-fg-muted">
                  App Theme
                </span>
                <AppThemeSwitcher />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-app-fg-muted">
                  Form Theme
                </span>
                <FormThemeSelector value={formTheme} onChange={setFormTheme} />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* App-wide Components Column */}
            <div className="space-y-12">
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-app-fg-heading mb-2">
                    App Button
                  </h2>
                  <p className="text-sm text-app-fg-muted">
                    Flexible button component with variants, colors, and sizes
                  </p>
                </div>

                {/* Variants Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-app-fg-heading">
                    Variants
                  </h3>
                  <div className="bg-app-surface p-6 rounded-lg border border-app-border-subtle">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Solid
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary">
                            Solid
                          </AppButton>
                          <AppButton variant="solid" color="primary" disabled>
                            Disabled
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Outline
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="outline" color="primary">
                            Outline
                          </AppButton>
                          <AppButton variant="outline" color="primary" disabled>
                            Disabled
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Ghost
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="ghost" color="primary">
                            Ghost
                          </AppButton>
                          <AppButton variant="ghost" color="primary" disabled>
                            Disabled
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Link
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="link" color="primary">
                            Link Button
                          </AppButton>
                          <AppButton variant="link" color="primary" disabled>
                            Disabled
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colors Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-app-fg-heading">
                    Colors
                  </h3>
                  <div className="bg-app-surface p-6 rounded-lg border border-app-border-subtle">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Primary
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary">
                            Solid
                          </AppButton>
                          <AppButton variant="outline" color="primary">
                            Outline
                          </AppButton>
                          <AppButton variant="ghost" color="primary">
                            Ghost
                          </AppButton>
                          <AppButton variant="link" color="primary">
                            Link
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Secondary
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="secondary">
                            Solid
                          </AppButton>
                          <AppButton variant="outline" color="secondary">
                            Outline
                          </AppButton>
                          <AppButton variant="ghost" color="secondary">
                            Ghost
                          </AppButton>
                          <AppButton variant="link" color="secondary">
                            Link
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Positive
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="positive">
                            Solid
                          </AppButton>
                          <AppButton variant="outline" color="positive">
                            Outline
                          </AppButton>
                          <AppButton variant="ghost" color="positive">
                            Ghost
                          </AppButton>
                          <AppButton variant="link" color="positive">
                            Link
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Negative
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="negative">
                            Solid
                          </AppButton>
                          <AppButton variant="outline" color="negative">
                            Outline
                          </AppButton>
                          <AppButton variant="ghost" color="negative">
                            Ghost
                          </AppButton>
                          <AppButton variant="link" color="negative">
                            Link
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sizes Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-app-fg-heading">
                    Sizes
                  </h3>
                  <div className="bg-app-surface p-6 rounded-lg border border-app-border-subtle">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Small
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary" size="sm">
                            Small Button
                          </AppButton>
                          <AppButton
                            variant="outline"
                            color="primary"
                            size="sm"
                          >
                            Small
                          </AppButton>
                          <AppButton variant="ghost" color="primary" size="sm">
                            Small
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Medium (Default)
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary" size="md">
                            Medium Button
                          </AppButton>
                          <AppButton
                            variant="outline"
                            color="primary"
                            size="md"
                          >
                            Medium
                          </AppButton>
                          <AppButton variant="ghost" color="primary" size="md">
                            Medium
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-app-fg-muted mb-2">
                          Large
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary" size="lg">
                            Large Button
                          </AppButton>
                          <AppButton
                            variant="outline"
                            color="primary"
                            size="lg"
                          >
                            Large
                          </AppButton>
                          <AppButton variant="ghost" color="primary" size="lg">
                            Large
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Form-specific Components Column */}
            <FormThemeContainer theme={formTheme}>
              <div className="space-y-12">
                <section className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-app-fg-heading">
                      Form Button
                    </h2>
                    <p className="text-sm text-app-fg-muted">
                      Form-specific button component with variants, colors, and
                      sizes
                    </p>
                  </div>

                  {/* Variants Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-app-fg-heading">
                      Variants
                    </h3>
                    <div className="bg-form-surface p-6 rounded-lg border border-form-border-subtle">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Solid
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton variant="solid" color="primary">
                              Solid
                            </FormButton>
                            <FormButton
                              variant="solid"
                              color="primary"
                              disabled
                            >
                              Disabled
                            </FormButton>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Outline
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton variant="outline" color="primary">
                              Outline
                            </FormButton>
                            <FormButton
                              variant="outline"
                              color="primary"
                              disabled
                            >
                              Disabled
                            </FormButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-app-fg-heading">
                      Colors
                    </h3>
                    <div className="bg-form-surface p-6 rounded-lg border border-form-border-subtle">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Primary
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton variant="solid" color="primary">
                              Solid
                            </FormButton>
                            <FormButton variant="outline" color="primary">
                              Outline
                            </FormButton>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Secondary
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton variant="solid" color="secondary">
                              Solid
                            </FormButton>
                            <FormButton variant="outline" color="secondary">
                              Outline
                            </FormButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sizes Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-app-fg-heading">
                      Sizes
                    </h3>
                    <div className="bg-form-surface p-6 rounded-lg border border-form-border-subtle">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Medium (Default)
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton
                              variant="solid"
                              color="primary"
                              size="md"
                            >
                              Medium Button
                            </FormButton>
                            <FormButton
                              variant="outline"
                              color="primary"
                              size="md"
                            >
                              Medium
                            </FormButton>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-form-fg-muted mb-2">
                            Large
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton
                              variant="solid"
                              color="primary"
                              size="lg"
                            >
                              Large Button
                            </FormButton>
                            <FormButton
                              variant="outline"
                              color="primary"
                              size="lg"
                            >
                              Large
                            </FormButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </FormThemeContainer>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-app-border-subtle">
            <p className="text-sm text-app-fg-muted">
              All components use CSS variables for theming. Switch between app
              themes (light/dark) and form themes to see automatic styling
              updates without code changes.
            </p>
          </div>
        </div>
      </div>
    </AppThemeContainer>
  );
}

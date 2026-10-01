"use client";

import { useState } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { FormButton } from "@/design-system/form/FormButton";
import { AppInput } from "@/design-system/app/AppInput";
import { AppTextArea } from "@/design-system/app/AppTextArea";
import {
  AppSelect,
  AppSelectTrigger,
  AppSelectValue,
  AppSelectContent,
  AppSelectItem,
} from "@/design-system/app/AppSelect";
import { FormInput } from "@/design-system/form/FormInput";
import { FormTextArea } from "@/design-system/form/FormTextArea";
import {
  FormSelect,
  FormSelectTrigger,
  FormSelectValue,
  FormSelectContent,
  FormSelectItem,
} from "@/design-system/form/FormSelect";
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
    <AppThemeContainer>
      <div className="bg-app-canvas text-app-fg p-8">
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
            {/* App Components Column */}
            <div>
              <h2 className="text-2xl font-bold text-app-fg-heading mb-2">
                App Components
              </h2>
              <p className="text-sm text-app-fg-muted mb-6">
                Core components for application-wide usage
              </p>
              <div className="bg-app-surface p-6 rounded-lg border border-app-border-subtle">
                <div className="flex flex-col gap-12">
                  {/* Button Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Button
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Flexible button with variants, colors, and sizes
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Variants
                        </h4>
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
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Colors
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary">
                            Primary
                          </AppButton>
                          <AppButton variant="solid" color="secondary">
                            Secondary
                          </AppButton>
                          <AppButton variant="solid" color="positive">
                            Positive
                          </AppButton>
                          <AppButton variant="solid" color="negative">
                            Negative
                          </AppButton>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <AppButton variant="solid" color="primary" size="sm">
                            Small
                          </AppButton>
                          <AppButton variant="solid" color="primary" size="md">
                            Medium
                          </AppButton>
                          <AppButton variant="solid" color="primary" size="lg">
                            Large
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Input
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Text input with multiple types and sizes
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Types
                        </h4>
                        <div className="flex flex-col gap-2">
                          <AppInput type="text" placeholder="Text" />
                          <AppInput type="number" placeholder="Number" />
                          <AppInput type="url" placeholder="URL" />
                          <AppInput type="password" placeholder="Password" />
                          <AppInput
                            type="text"
                            placeholder="Disabled"
                            disabled
                          />
                          <AppInput
                            type="email"
                            placeholder="Invalid"
                            aria-invalid
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-2">
                          <AppInput
                            inputSize="sm"
                            type="text"
                            placeholder="Small"
                          />
                          <AppInput
                            inputSize="md"
                            type="text"
                            placeholder="Medium"
                          />
                          <AppInput
                            inputSize="lg"
                            type="text"
                            placeholder="Large"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TextArea Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      TextArea
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Multi-line text input
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-2">
                          <AppTextArea placeholder="Default state" />
                          <AppTextArea placeholder="Disabled" disabled />
                          <AppTextArea placeholder="Invalid" aria-invalid />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Select Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Select
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Dropdown selection component
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Single Select
                        </h4>
                        <div className="flex flex-col gap-2">
                          <AppSelect size="sm">
                            <AppSelectTrigger>
                              <AppSelectValue placeholder="Small" />
                            </AppSelectTrigger>
                            <AppSelectContent>
                              <AppSelectItem value="1">Option 1</AppSelectItem>
                              <AppSelectItem value="2">Option 2</AppSelectItem>
                            </AppSelectContent>
                          </AppSelect>
                          <AppSelect size="md">
                            <AppSelectTrigger>
                              <AppSelectValue placeholder="Medium" />
                            </AppSelectTrigger>
                            <AppSelectContent>
                              <AppSelectItem value="1">Option 1</AppSelectItem>
                              <AppSelectItem value="2">Option 2</AppSelectItem>
                            </AppSelectContent>
                          </AppSelect>
                          <AppSelect size="lg">
                            <AppSelectTrigger>
                              <AppSelectValue placeholder="Large" />
                            </AppSelectTrigger>
                            <AppSelectContent>
                              <AppSelectItem value="1">Option 1</AppSelectItem>
                              <AppSelectItem value="2">Option 2</AppSelectItem>
                            </AppSelectContent>
                          </AppSelect>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Components Column */}
            <FormThemeContainer theme={formTheme}>
              <div>
                <h2 className="text-2xl font-bold text-form-fg-heading mb-2">
                  Form Components
                </h2>
                <p className="text-sm text-form-fg-muted mb-6">
                  Form-specific components with theme variants
                </p>
                <div className="bg-form-surface p-6 rounded-lg border border-form-border-subtle">
                  <div className="flex flex-col gap-12">
                    {/* Button Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Button
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Form-specific button component
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Variants
                          </h4>
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
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Colors
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton variant="solid" color="primary">
                              Primary
                            </FormButton>
                            <FormButton variant="solid" color="secondary">
                              Secondary
                            </FormButton>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormButton
                              variant="solid"
                              color="primary"
                              size="md"
                            >
                              Medium
                            </FormButton>
                            <FormButton
                              variant="solid"
                              color="primary"
                              size="lg"
                            >
                              Large
                            </FormButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Input
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Text input with multiple types and sizes
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Types
                          </h4>
                          <div className="flex flex-col gap-2">
                            <FormInput type="text" placeholder="Text" />
                            <FormInput type="number" placeholder="Number" />
                            <FormInput type="url" placeholder="URL" />
                            <FormInput type="password" placeholder="Password" />
                            <FormInput
                              type="text"
                              placeholder="Disabled"
                              disabled
                            />
                            <FormInput
                              type="email"
                              placeholder="Invalid"
                              aria-invalid
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-2">
                            <FormInput
                              inputSize="sm"
                              type="text"
                              placeholder="Small"
                            />
                            <FormInput
                              inputSize="md"
                              type="text"
                              placeholder="Medium"
                            />
                            <FormInput
                              inputSize="lg"
                              type="text"
                              placeholder="Large"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TextArea Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        TextArea
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Multi-line text input
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-2">
                            <FormTextArea placeholder="Default state" />
                            <FormTextArea placeholder="Disabled" disabled />
                            <FormTextArea placeholder="Invalid" aria-invalid />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Select Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Select
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Dropdown selection component
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Single Select
                          </h4>
                          <div className="flex flex-col gap-2">
                            <FormSelect size="sm">
                              <FormSelectTrigger>
                                <FormSelectValue placeholder="Small" />
                              </FormSelectTrigger>
                              <FormSelectContent>
                                <FormSelectItem value="1">
                                  Option 1
                                </FormSelectItem>
                                <FormSelectItem value="2">
                                  Option 2
                                </FormSelectItem>
                              </FormSelectContent>
                            </FormSelect>
                            <FormSelect size="md">
                              <FormSelectTrigger>
                                <FormSelectValue placeholder="Medium" />
                              </FormSelectTrigger>
                              <FormSelectContent>
                                <FormSelectItem value="1">
                                  Option 1
                                </FormSelectItem>
                                <FormSelectItem value="2">
                                  Option 2
                                </FormSelectItem>
                              </FormSelectContent>
                            </FormSelect>
                            <FormSelect size="lg">
                              <FormSelectTrigger>
                                <FormSelectValue placeholder="Large" />
                              </FormSelectTrigger>
                              <FormSelectContent>
                                <FormSelectItem value="1">
                                  Option 1
                                </FormSelectItem>
                                <FormSelectItem value="2">
                                  Option 2
                                </FormSelectItem>
                              </FormSelectContent>
                            </FormSelect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

"use client";

import { useState } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { AppLabel } from "@/design-system/app/AppLabel";
import { FormButton } from "@/design-system/form/FormButton";
import { FormLabel } from "@/design-system/form/FormLabel";
import { AppInput } from "@/design-system/app/AppInput";
import { AppTextArea } from "@/design-system/app/AppTextArea";
import { AppSelect } from "@/design-system/app/AppSelect";
import { FormInput } from "@/design-system/form/FormInput";
import { FormTextArea } from "@/design-system/form/FormTextArea";
import { FormSelect } from "@/design-system/form/FormSelect";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { AppThemeSwitcher } from "@/components/layout/AppThemeSwitcher";
import { FormThemeSelector } from "@/components/layout/FormThemeSelector";
import type { FormTheme } from "@/lib/types/themes";

const SELECT_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

const SELECT_SIZES = ["sm", "md", "lg"] as const;

const SELECT_SIZE_LABELS = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
} as const;

type SelectSize = (typeof SELECT_SIZES)[number];

const INITIAL_SELECT_VALUES: Record<SelectSize, string> = {
  sm: "draft",
  md: "review",
  lg: "published",
};

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
  const [appSelectValues, setAppSelectValues] = useState(INITIAL_SELECT_VALUES);
  const [formSelectValues, setFormSelectValues] = useState(
    INITIAL_SELECT_VALUES,
  );

  return (
    <AppThemeContainer>
      <div className="bg-app-canvas text-app-fg p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-app-fg-heading mb-2">
              Design System Components
            </h1>
            <p className="text-app-fg-muted">
              Derived components with theme-aware styling and comprehensive
              variants
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* App Components Column */}
            <div>
              <div className="flex items-center justify-between mb-6">
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
                  <AppThemeSwitcher />
                </div>
              </div>
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
                          {SELECT_SIZES.map((size) => (
                            <div key={size} className="flex flex-col gap-1">
                              <span className="text-xs font-medium text-app-fg-muted">
                                {SELECT_SIZE_LABELS[size]}
                              </span>
                              <AppSelect
                                size={size}
                                items={SELECT_OPTIONS}
                                value={appSelectValues[size]}
                                placeholder="Choose status"
                                onValueChange={(next) => {
                                  if (!next) return;
                                  setAppSelectValues((current) => ({
                                    ...current,
                                    [size]: next,
                                  }));
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Label
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Field label with small, medium, and large sizes
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-3">
                          <AppLabel size="sm" htmlFor="app-label-sm">
                            Small label
                          </AppLabel>
                          <AppLabel size="md" htmlFor="app-label-md">
                            Medium label
                          </AppLabel>
                          <AppLabel size="lg" htmlFor="app-label-lg">
                            Large label
                          </AppLabel>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-3">
                          <AppLabel
                            size="md"
                            required
                            htmlFor="app-label-required"
                          >
                            Required
                          </AppLabel>
                          <AppLabel
                            size="md"
                            aria-invalid
                            htmlFor="app-label-invalid"
                          >
                            Invalid
                          </AppLabel>
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
                <div className="flex items-center justify-between mb-6">
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
                    <FormThemeSelector
                      value={formTheme}
                      onChange={setFormTheme}
                    />
                  </div>
                </div>
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
                            {SELECT_SIZES.map((size) => (
                              <div key={size} className="flex flex-col gap-1">
                                <span className="text-xs font-medium text-form-fg-muted">
                                  {SELECT_SIZE_LABELS[size]}
                                </span>
                                <FormSelect
                                  size={size}
                                  items={SELECT_OPTIONS}
                                  value={formSelectValues[size]}
                                  placeholder="Choose status"
                                  onValueChange={(next) => {
                                    if (!next) return;
                                    setFormSelectValues((current) => ({
                                      ...current,
                                      [size]: next,
                                    }));
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Label Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Label
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Field label with medium and large sizes
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-3">
                            <FormLabel size="md" htmlFor="form-label-md">
                              Medium label
                            </FormLabel>
                            <FormLabel size="lg" htmlFor="form-label-lg">
                              Large label
                            </FormLabel>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-3">
                            <FormLabel
                              size="md"
                              required
                              htmlFor="form-label-required"
                            >
                              Required
                            </FormLabel>
                            <FormLabel
                              size="md"
                              aria-invalid
                              htmlFor="form-label-invalid"
                            >
                              Invalid
                            </FormLabel>
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

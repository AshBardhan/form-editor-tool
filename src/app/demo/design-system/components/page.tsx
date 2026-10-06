"use client";

import { useState } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { AppLabel } from "@/design-system/app/AppLabel";
import { AppText } from "@/design-system/app/AppText";
import { FormButton } from "@/design-system/form/FormButton";
import { FormLabel } from "@/design-system/form/FormLabel";
import { FormText } from "@/design-system/form/FormText";
import { AppInput } from "@/design-system/app/AppInput";
import { AppTextArea } from "@/design-system/app/AppTextArea";
import { AppSelect } from "@/design-system/app/AppSelect";
import { AppCheckbox } from "@/design-system/app/AppCheckbox";
import { AppCheckboxGroup } from "@/design-system/app/AppCheckboxGroup";
import { AppRadioGroup } from "@/design-system/app/AppRadioGroup";
import { AppSwitch } from "@/design-system/app/AppSwitch";
import { FormInput } from "@/design-system/form/FormInput";
import { FormTextArea } from "@/design-system/form/FormTextArea";
import { FormSelect } from "@/design-system/form/FormSelect";
import { FormCheckbox } from "@/design-system/form/FormCheckbox";
import { FormCheckboxGroup } from "@/design-system/form/FormCheckboxGroup";
import { FormRadioGroup } from "@/design-system/form/FormRadioGroup";
import { FormSwitch } from "@/design-system/form/FormSwitch";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { TEXT_VARIANTS, type TextVariant } from "@/design-system/primitives";
import { AppThemeSwitcher } from "@/components/layout/AppThemeSwitcher";
import { FormThemeSelector } from "@/components/layout/FormThemeSelector";
import type { FormTheme } from "@/lib/types/themes";

const SELECT_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

const NOTIFICATION_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push", disabled: true },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived", disabled: true },
];

const APP_SELECT_SIZES = ["sm", "md", "lg"] as const;
const FORM_SELECT_SIZES = ["md", "lg"] as const;
const APP_CHOICE_SIZES = APP_SELECT_SIZES;
const FORM_CHOICE_SIZES = FORM_SELECT_SIZES;

const SELECT_SIZE_LABELS = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
} as const;

const TEXT_SAMPLES: Record<TextVariant, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  p: "Paragraph copy that uses the body font and color.",
  span: "Inline span",
  div: "Block text",
};

type AppSelectSize = (typeof APP_SELECT_SIZES)[number];
type FormSelectSize = (typeof FORM_SELECT_SIZES)[number];

const INITIAL_APP_SELECT_VALUES: Record<AppSelectSize, string> = {
  sm: "draft",
  md: "review",
  lg: "published",
};

const INITIAL_FORM_SELECT_VALUES: Record<FormSelectSize, string> = {
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
  const [appSelectValues, setAppSelectValues] = useState(
    INITIAL_APP_SELECT_VALUES,
  );
  const [formSelectValues, setFormSelectValues] = useState(
    INITIAL_FORM_SELECT_VALUES,
  );
  const [appCheckboxChecked, setAppCheckboxChecked] = useState(true);
  const [appCheckboxValues, setAppCheckboxValues] = useState<string[]>([
    "email",
  ]);
  const [appRadioValue, setAppRadioValue] = useState("review");
  const [appSwitchChecked, setAppSwitchChecked] = useState(true);
  const [formCheckboxChecked, setFormCheckboxChecked] = useState(true);
  const [formCheckboxValues, setFormCheckboxValues] = useState<string[]>([
    "email",
  ]);
  const [formRadioValue, setFormRadioValue] = useState("review");
  const [formSwitchChecked, setFormSwitchChecked] = useState(true);

  return (
    <AppThemeContainer>
      <div className="bg-app-backdrop text-app-fg p-8">
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
                  {/* Text Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Text
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Viewport-responsive type. Sizes step up at sm and 2xl.
                    </p>
                    <div className="flex flex-col gap-3">
                      {TEXT_VARIANTS.map((variant) => (
                        <AppText key={variant} variant={variant}>
                          {TEXT_SAMPLES[variant]}
                        </AppText>
                      ))}
                    </div>
                  </div>

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
                          {APP_SELECT_SIZES.map((size) => (
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

                  {/* Checkbox Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Checkbox
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Single checkbox with a label
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-3">
                          <AppCheckbox
                            label="Email me product updates"
                            checked={appCheckboxChecked}
                            onCheckedChange={setAppCheckboxChecked}
                          />
                          <AppCheckbox label="Disabled" disabled />
                          <AppCheckbox
                            label="Disabled checked"
                            disabled
                            defaultChecked
                          />
                          <AppCheckbox label="Invalid" aria-invalid />
                          <AppCheckbox label="Required" required />
                          <AppCheckbox label="Indeterminate" indeterminate />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-3">
                          {APP_CHOICE_SIZES.map((size) => (
                            <AppCheckbox
                              key={size}
                              size={size}
                              label={SELECT_SIZE_LABELS[size]}
                              defaultChecked={size === "md"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox Group Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Checkbox Group
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Multiple checkboxes with a shared legend
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Orientation
                        </h4>
                        <div className="flex flex-col gap-6">
                          <AppCheckboxGroup
                            label="Notifications"
                            options={NOTIFICATION_OPTIONS}
                            value={appCheckboxValues}
                            onValueChange={setAppCheckboxValues}
                          />
                          <AppCheckboxGroup
                            label="Horizontal"
                            orientation="horizontal"
                            options={NOTIFICATION_OPTIONS}
                            defaultValue={["sms"]}
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-6">
                          <AppCheckboxGroup
                            label="Invalid"
                            options={NOTIFICATION_OPTIONS}
                            defaultValue={["email"]}
                            aria-invalid
                            required
                          />
                          <AppCheckboxGroup
                            label="Disabled"
                            options={NOTIFICATION_OPTIONS}
                            defaultValue={["email"]}
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-6">
                          {APP_CHOICE_SIZES.map((size) => (
                            <AppCheckboxGroup
                              key={size}
                              size={size}
                              label={SELECT_SIZE_LABELS[size]}
                              orientation="horizontal"
                              options={NOTIFICATION_OPTIONS}
                              defaultValue={["email"]}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Radio Group Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Radio Group
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Single selection from a set of options
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Orientation
                        </h4>
                        <div className="flex flex-col gap-6">
                          <AppRadioGroup
                            label="Status"
                            options={STATUS_OPTIONS}
                            value={appRadioValue}
                            onValueChange={setAppRadioValue}
                          />
                          <AppRadioGroup
                            label="Horizontal"
                            orientation="horizontal"
                            options={STATUS_OPTIONS}
                            defaultValue="published"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-6">
                          <AppRadioGroup
                            label="Invalid"
                            options={STATUS_OPTIONS}
                            defaultValue="draft"
                            aria-invalid
                            required
                          />
                          <AppRadioGroup
                            label="Disabled"
                            options={STATUS_OPTIONS}
                            defaultValue="review"
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-6">
                          {APP_CHOICE_SIZES.map((size) => (
                            <AppRadioGroup
                              key={size}
                              size={size}
                              label={SELECT_SIZE_LABELS[size]}
                              orientation="horizontal"
                              options={STATUS_OPTIONS}
                              defaultValue="review"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Switch Component */}
                  <div>
                    <h3 className="text-lg font-semibold text-app-fg-heading mb-1">
                      Switch
                    </h3>
                    <p className="text-sm text-app-fg-muted mb-4">
                      Toggle with a label to the right of the track
                    </p>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          States
                        </h4>
                        <div className="flex flex-col gap-3">
                          <AppSwitch
                            label="Email me product updates"
                            checked={appSwitchChecked}
                            onCheckedChange={setAppSwitchChecked}
                          />
                          <AppSwitch label="Disabled" disabled />
                          <AppSwitch
                            label="Disabled on"
                            disabled
                            defaultChecked
                          />
                          <AppSwitch label="Invalid" aria-invalid />
                          <AppSwitch label="Required" required />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-app-fg-heading mb-2">
                          Sizes
                        </h4>
                        <div className="flex flex-col gap-3">
                          {APP_CHOICE_SIZES.map((size) => (
                            <AppSwitch
                              key={size}
                              size={size}
                              label={SELECT_SIZE_LABELS[size]}
                              defaultChecked={size === "md"}
                            />
                          ))}
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
                    {/* Text Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Text
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Container-responsive type. Sizes step up at @sm and @5xl
                        inside the form container.
                      </p>
                      <div className="flex flex-col gap-3">
                        {TEXT_VARIANTS.map((variant) => (
                          <FormText key={variant} variant={variant}>
                            {TEXT_SAMPLES[variant]}
                          </FormText>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col gap-4">
                        <div className="@container w-64 rounded-md border border-form-border-subtle p-3">
                          <FormText variant="h2">Narrow container</FormText>
                          <FormText variant="p">
                            This box is below the @sm container breakpoint.
                          </FormText>
                        </div>
                        <div className="@container w-full rounded-md border border-form-border-subtle p-3">
                          <FormText variant="h2">Wide container</FormText>
                          <FormText variant="p">
                            This box uses the form column width, so it steps up
                            once the column reaches @sm.
                          </FormText>
                        </div>
                      </div>
                    </div>

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
                        Text input with multiple types and medium and large
                        sizes
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
                            {FORM_SELECT_SIZES.map((size) => (
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

                    {/* Checkbox Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Checkbox
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Single checkbox with a label
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-3">
                            <FormCheckbox
                              label="Email me product updates"
                              checked={formCheckboxChecked}
                              onCheckedChange={setFormCheckboxChecked}
                            />
                            <FormCheckbox label="Disabled" disabled />
                            <FormCheckbox
                              label="Disabled checked"
                              disabled
                              defaultChecked
                            />
                            <FormCheckbox label="Invalid" aria-invalid />
                            <FormCheckbox label="Required" required />
                            <FormCheckbox label="Indeterminate" indeterminate />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-3">
                            {FORM_CHOICE_SIZES.map((size) => (
                              <FormCheckbox
                                key={size}
                                size={size}
                                label={SELECT_SIZE_LABELS[size]}
                                defaultChecked={size === "lg"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Checkbox Group Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Checkbox Group
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Multiple checkboxes with a shared legend
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Orientation
                          </h4>
                          <div className="flex flex-col gap-6">
                            <FormCheckboxGroup
                              label="Notifications"
                              options={NOTIFICATION_OPTIONS}
                              value={formCheckboxValues}
                              onValueChange={setFormCheckboxValues}
                            />
                            <FormCheckboxGroup
                              label="Horizontal"
                              orientation="horizontal"
                              options={NOTIFICATION_OPTIONS}
                              defaultValue={["sms"]}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-6">
                            <FormCheckboxGroup
                              label="Invalid"
                              options={NOTIFICATION_OPTIONS}
                              defaultValue={["email"]}
                              aria-invalid
                              required
                            />
                            <FormCheckboxGroup
                              label="Disabled"
                              options={NOTIFICATION_OPTIONS}
                              defaultValue={["email"]}
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-6">
                            {FORM_CHOICE_SIZES.map((size) => (
                              <FormCheckboxGroup
                                key={size}
                                size={size}
                                label={SELECT_SIZE_LABELS[size]}
                                orientation="horizontal"
                                options={NOTIFICATION_OPTIONS}
                                defaultValue={["email"]}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Radio Group Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Radio Group
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Single selection from a set of options
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Orientation
                          </h4>
                          <div className="flex flex-col gap-6">
                            <FormRadioGroup
                              label="Status"
                              options={STATUS_OPTIONS}
                              value={formRadioValue}
                              onValueChange={setFormRadioValue}
                            />
                            <FormRadioGroup
                              label="Horizontal"
                              orientation="horizontal"
                              options={STATUS_OPTIONS}
                              defaultValue="published"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-6">
                            <FormRadioGroup
                              label="Invalid"
                              options={STATUS_OPTIONS}
                              defaultValue="draft"
                              aria-invalid
                              required
                            />
                            <FormRadioGroup
                              label="Disabled"
                              options={STATUS_OPTIONS}
                              defaultValue="review"
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-6">
                            {FORM_CHOICE_SIZES.map((size) => (
                              <FormRadioGroup
                                key={size}
                                size={size}
                                label={SELECT_SIZE_LABELS[size]}
                                orientation="horizontal"
                                options={STATUS_OPTIONS}
                                defaultValue="review"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Switch Component */}
                    <div>
                      <h3 className="text-lg font-semibold text-form-fg-heading mb-1">
                        Switch
                      </h3>
                      <p className="text-sm text-form-fg-muted mb-4">
                        Toggle with a label to the right of the track
                      </p>
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            States
                          </h4>
                          <div className="flex flex-col gap-3">
                            <FormSwitch
                              label="Email me product updates"
                              checked={formSwitchChecked}
                              onCheckedChange={setFormSwitchChecked}
                            />
                            <FormSwitch label="Disabled" disabled />
                            <FormSwitch
                              label="Disabled on"
                              disabled
                              defaultChecked
                            />
                            <FormSwitch label="Invalid" aria-invalid />
                            <FormSwitch label="Required" required />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-form-fg-heading mb-2">
                            Sizes
                          </h4>
                          <div className="flex flex-col gap-3">
                            {FORM_CHOICE_SIZES.map((size) => (
                              <FormSwitch
                                key={size}
                                size={size}
                                label={SELECT_SIZE_LABELS[size]}
                                defaultChecked={size === "lg"}
                              />
                            ))}
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

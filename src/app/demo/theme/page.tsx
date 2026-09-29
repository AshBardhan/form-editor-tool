"use client";

import { useState } from "react";

const FORM_THEME_PREVIEWS = [
  { id: "light", name: "Light", description: "Clean, familiar surfaces" },
  { id: "dark", name: "Dark", description: "Low-light contrast" },
  { id: "forest", name: "Forest", description: "Grounded greens and warmth" },
  { id: "beach", name: "Beach", description: "Warm sand with teal accents" },
  { id: "frost", name: "Frost", description: "Cool, crisp blues" },
  { id: "fire", name: "Fire", description: "Warm reds and soft neutrals" },
] as const;

function SampleButton({
  children,
  scope,
}: {
  children: React.ReactNode;
  scope: "app" | "form";
}) {
  return (
    <button
      className={
        scope === "app"
          ? "rounded-app-brand bg-app-brand px-4 py-2 text-sm font-semibold text-app-fg-on-brand shadow-app-brand transition-colors hover:bg-app-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-brand"
          : "rounded-form-brand bg-form-brand px-4 py-2 text-sm font-semibold text-form-fg-on-brand shadow-form-brand transition-colors hover:bg-form-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-form-brand"
      }
      type="button"
    >
      {children}
    </button>
  );
}

function SampleField({
  label,
  value,
  scope,
}: {
  label: string;
  value: string;
  scope: "app" | "form";
}) {
  return (
    <label
      className={`grid gap-2 text-sm font-medium ${scope === "app" ? "text-app-fg" : "text-form-fg"}`}
    >
      {label}
      <input
        className={
          scope === "app"
            ? "w-full rounded-app-brand border border-app-field-border bg-app-field px-3 py-2 text-app-fg placeholder:text-app-field-placeholder focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-brand"
            : "w-full rounded-form-brand border border-form-field-border bg-form-field px-3 py-2 text-form-fg placeholder:text-form-field-placeholder focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-form-brand"
        }
        defaultValue={value}
        readOnly
      />
    </label>
  );
}

function FormPreview({
  themeId,
  name,
  description,
}: {
  themeId: string;
  name: string;
  description: string;
}) {
  return (
    <div
      data-form-theme={themeId}
      className="rounded-form-brand border border-form-border-subtle bg-form-surface p-5 text-form-fg shadow-form-brand"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-form-fg-muted">
            Form theme
          </p>
          <h3 className="mt-1 font-form-heading text-xl font-semibold text-form-fg-heading">
            {name}
          </h3>
          <p className="mt-1 text-sm text-form-fg-muted">{description}</p>
        </div>
        <span className="rounded-form-brand bg-form-brand-subtle px-2.5 py-1 text-xs font-semibold text-form-brand">
          {themeId}
        </span>
      </div>

      <div className="rounded-form-brand border border-form-border-subtle bg-form-surface-muted p-4">
        <h4 className="font-form-heading text-lg font-semibold text-form-fg-heading">
          Contact details
        </h4>
        <p className="mb-4 mt-1 text-sm text-form-fg-muted">
          This nested panel should follow its form theme, not the dark app theme.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <SampleField label="Full name" value="Jordan Lee" scope="form" />
          <SampleField
            label="Email address"
            value="jordan@example.com"
            scope="form"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SampleButton scope="form">Send response</SampleButton>
          <span className="text-sm text-form-success">Ready to submit</span>
        </div>
        <p className="mt-3 text-sm text-form-error">
          Example validation error uses the semantic error token.
        </p>
      </div>
    </div>
  );
}

export default function ThemeDemoPage() {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("dark");

  return (
    <main className="min-h-screen p-4 sm:p-8">
      {/* Hardcoded app scope for repeatable visual checks. */}
      <div
        data-app-theme={appTheme}
        className="mx-auto max-w-7xl rounded-app-brand bg-app-canvas p-5 text-app-fg sm:p-8"
      >
        <header className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-app-brand border border-app-header-border bg-app-header p-5 text-app-header-fg">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-app-header-fg">
              Design system sandbox
            </p>
            <h1 className="mt-2 font-app-heading text-3xl font-bold text-app-header-fg sm:text-4xl">
              Scoped theme preview
            </h1>
            <p className="mt-2 max-w-2xl text-app-header-fg">
              The outer container uses the selected app theme. Nested form
              previews override its shared token values.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1 text-sm font-medium text-app-header-fg">
              App theme
              <select
                className="rounded-app-brand border border-app-field-border bg-app-field px-3 py-2 text-app-fg"
                value={appTheme}
                onChange={(event) =>
                  setAppTheme(event.target.value as "light" | "dark")
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        </header>

        <div className="mb-6 rounded-app-brand border border-app-page-header-border bg-app-page-header p-4 text-app-page-header-fg">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Page header surface
          </p>
          <p className="mt-1 font-app-heading text-lg font-semibold">
            This region has its own app page-header tokens.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <aside className="rounded-app-brand border border-app-sidebar-border bg-app-sidebar p-5 text-app-sidebar-fg shadow-app-brand">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              App-scoped sample
            </p>
            <h2 className="mt-2 font-app-heading text-xl font-semibold">
              Builder configuration
            </h2>
            <p className="mt-2 text-sm opacity-75">
              These dummy controls inherit the app theme from the parent.
            </p>
            <div className="mt-5 grid gap-4">
              <SampleField label="Form title" value="Customer feedback" scope="app" />
              <SampleField label="Public URL" value="/f/customer-feedback" scope="app" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <SampleButton scope="app">Save changes</SampleButton>
              <span className="text-sm opacity-75">Draft</span>
            </div>
          </aside>

          <div className="grid content-start gap-4 rounded-app-brand bg-app-main-content p-4">
            {FORM_THEME_PREVIEWS.map((theme) => (
              <FormPreview key={theme.id} {...theme} themeId={theme.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

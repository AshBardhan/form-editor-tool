"use client";

import * as React from "react";
import {
  AlertDemo,
  AvatarDemo,
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  InputDemo,
  InputOTPDemo,
  MetricDemo,
  ModalDemo,
  RadioGroupDemo,
  SelectDemo,
  SkeletonDemo,
  SwitchDemo,
  TextDemo,
  TextareaDemo,
  ToastDemo,
} from "@/components/demos";
import { Separator } from "@/components/ui/Separator";

/**
 * Main Demo Page - Showcases all UI primitive components
 * Each component demo is imported from the demos folder
 */
export default function DemoPage() {
  const components = [
    { id: "button", name: "Button" },
    { id: "input", name: "Input" },
    { id: "textarea", name: "Textarea" },
    { id: "checkbox", name: "Checkbox" },
    { id: "switch", name: "Switch" },
    { id: "radiogroup", name: "RadioGroup" },
    { id: "select", name: "Select" },
    { id: "inputotp", name: "InputOTP" },
    { id: "modal", name: "Modal" },
    { id: "badge", name: "Badge" },
    { id: "avatar", name: "Avatar" },
    { id: "card", name: "Card" },
    { id: "text", name: "Text" },
    { id: "metric", name: "Metric" },
    { id: "skeleton", name: "Skeleton" },
    { id: "alert", name: "Alert" },
    { id: "toast", name: "Toast" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            UI Components Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our primitive UI components with interactive examples
            showcasing various props, variants, and use cases. Each component is
            built with accessibility and customization in mind.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="flex gap-8 lg:gap-12">
          {/* Left Sidebar - Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8">
              <nav>
                <h2 className="font-semibold mb-3 text-foreground text-sm uppercase tracking-wider">
                  Components
                </h2>
                <ul className="space-y-1">
                  {components.map((component) => (
                    <li key={component.id}>
                      <a
                        href={`#${component.id}`}
                        className="block px-3 py-2 rounded-md text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        {component.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Right Content - Demo Sections */}
          <main className="flex-1 min-w-0">
            {/* Mobile Navigation */}
            <nav className="lg:hidden mb-8 p-6 bg-muted/30 rounded-lg border border-border">
              <h2 className="font-semibold mb-3 text-foreground">Components</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {components.map((component) => (
                  <li key={component.id}>
                    <a
                      href={`#${component.id}`}
                      className="block px-3 py-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      {component.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Button Demo */}
            <section id="button" className="scroll-mt-8">
              <ButtonDemo />
            </section>

            <Separator className="my-16" />

            {/* Input Demo */}
            <section id="input" className="scroll-mt-8">
              <InputDemo />
            </section>

            <Separator className="my-16" />

            {/* Textarea Demo */}
            <section id="textarea" className="scroll-mt-8">
              <TextareaDemo />
            </section>

            <Separator className="my-16" />

            {/* Checkbox Demo */}
            <section id="checkbox" className="scroll-mt-8">
              <CheckboxDemo />
            </section>

            <Separator className="my-16" />

            {/* Switch Demo */}
            <section id="switch" className="scroll-mt-8">
              <SwitchDemo />
            </section>

            <Separator className="my-16" />

            {/* RadioGroup Demo */}
            <section id="radiogroup" className="scroll-mt-8">
              <RadioGroupDemo />
            </section>

            <Separator className="my-16" />

            {/* Select Demo */}
            <section id="select" className="scroll-mt-8">
              <SelectDemo />
            </section>

            <Separator className="my-16" />

            {/* InputOTP Demo */}
            <section id="inputotp" className="scroll-mt-8">
              <InputOTPDemo />
            </section>

            <Separator className="my-16" />

            {/* Modal Demo */}
            <section id="modal" className="scroll-mt-8">
              <ModalDemo />
            </section>

            <Separator className="my-16" />

            {/* Badge Demo */}
            <section id="badge" className="scroll-mt-8">
              <BadgeDemo />
            </section>

            <Separator className="my-16" />

            {/* Avatar Demo */}
            <section id="avatar" className="scroll-mt-8">
              <AvatarDemo />
            </section>

            <Separator className="my-16" />

            {/* Card Demo */}
            <section id="card" className="scroll-mt-8">
              <CardDemo />
            </section>

            <Separator className="my-16" />

            {/* Text Demo */}
            <section id="text" className="scroll-mt-8">
              <TextDemo />
            </section>

            <Separator className="my-16" />

            {/* Metric Demo */}
            <section id="metric" className="scroll-mt-8">
              <MetricDemo />
            </section>

            <Separator className="my-16" />

            {/* Skeleton Demo */}
            <section id="skeleton" className="scroll-mt-8">
              <SkeletonDemo />
            </section>

            <Separator className="my-16" />

            {/* Alert Demo */}
            <section id="alert" className="scroll-mt-8">
              <AlertDemo />
            </section>

            <Separator className="my-16" />

            {/* Toast Demo */}
            <section id="toast" className="scroll-mt-8">
              <ToastDemo />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

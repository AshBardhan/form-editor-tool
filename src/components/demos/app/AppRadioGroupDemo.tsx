"use client";

import { useState } from "react";
import { AppRadioGroup } from "@/design-system/app/AppRadioGroup";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  APP_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
  STATUS_OPTIONS,
} from "@/components/demos/constants";

export function AppRadioGroupDemo() {
  const [value, setValue] = useState("review");

  return (
    <DemoSection
      scope="app"
      title="Radio Group"
      description="Single selection from a set of options"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Orientation">
          <div className="flex flex-col gap-6">
            <AppRadioGroup
              label="Status"
              options={STATUS_OPTIONS}
              value={value}
              onValueChange={setValue}
            />
            <AppRadioGroup
              label="Horizontal"
              orientation="horizontal"
              options={STATUS_OPTIONS}
              defaultValue="published"
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="States">
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
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

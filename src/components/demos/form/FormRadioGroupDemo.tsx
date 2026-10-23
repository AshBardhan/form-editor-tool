"use client";

import { useState } from "react";
import { FormRadioGroup } from "@/design-system/form/FormRadioGroup";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  FORM_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
  STATUS_OPTIONS,
} from "@/components/demos/constants";

export function FormRadioGroupDemo() {
  const [value, setValue] = useState("review");

  return (
    <DemoSection
      scope="form"
      title="Radio Group"
      description="Single selection from a set of options"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Orientation">
          <div className="flex flex-col gap-6">
            <FormRadioGroup
              label="Status"
              options={STATUS_OPTIONS}
              value={value}
              onValueChange={setValue}
            />
            <FormRadioGroup
              label="Horizontal"
              orientation="horizontal"
              options={STATUS_OPTIONS}
              defaultValue="published"
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="States">
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
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

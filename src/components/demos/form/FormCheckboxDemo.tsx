"use client";

import { useState } from "react";
import { FormCheckbox } from "@/design-system/form/FormCheckbox";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  FORM_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function FormCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <DemoSection
      scope="form"
      title="Checkbox"
      description="Single checkbox with a label"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="States">
          <div className="flex flex-col gap-3">
            <FormCheckbox
              label="Email me product updates"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <FormCheckbox label="Disabled" disabled />
            <FormCheckbox label="Disabled checked" disabled defaultChecked />
            <FormCheckbox label="Invalid" aria-invalid />
            <FormCheckbox label="Required" required />
            <FormCheckbox label="Indeterminate" indeterminate />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

"use client";

import { useState } from "react";
import { AppCheckbox } from "@/design-system/app/AppCheckbox";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  APP_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function AppCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <DemoSection
      scope="app"
      title="Checkbox"
      description="Single checkbox with a label"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="States">
          <div className="flex flex-col gap-3">
            <AppCheckbox
              label="Email me product updates"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <AppCheckbox label="Disabled" disabled />
            <AppCheckbox label="Disabled checked" disabled defaultChecked />
            <AppCheckbox label="Invalid" aria-invalid />
            <AppCheckbox label="Required" required />
            <AppCheckbox label="Indeterminate" indeterminate />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

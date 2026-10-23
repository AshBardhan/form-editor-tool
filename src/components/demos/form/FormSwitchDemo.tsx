"use client";

import { useState } from "react";
import { FormSwitch } from "@/design-system/form/FormSwitch";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  FORM_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function FormSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <DemoSection
      scope="form"
      title="Switch"
      description="Toggle with a label to the right of the track"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="States">
          <div className="flex flex-col gap-3">
            <FormSwitch
              label="Email me product updates"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <FormSwitch label="Disabled" disabled />
            <FormSwitch label="Disabled on" disabled defaultChecked />
            <FormSwitch label="Invalid" aria-invalid />
            <FormSwitch label="Required" required />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

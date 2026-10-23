"use client";

import { useState } from "react";
import { AppSwitch } from "@/design-system/app/AppSwitch";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  APP_CHOICE_SIZES,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function AppSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <DemoSection
      scope="app"
      title="Switch"
      description="Toggle with a label to the right of the track"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="States">
          <div className="flex flex-col gap-3">
            <AppSwitch
              label="Email me product updates"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <AppSwitch label="Disabled" disabled />
            <AppSwitch label="Disabled on" disabled defaultChecked />
            <AppSwitch label="Invalid" aria-invalid />
            <AppSwitch label="Required" required />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
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
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

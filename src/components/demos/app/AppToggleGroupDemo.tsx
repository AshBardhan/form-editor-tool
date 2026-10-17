"use client";

import { useState } from "react";
import { AppToggleGroup } from "@/design-system/app/AppToggleGroup";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  ALIGNMENT_TOGGLE_OPTIONS,
  DEVICE_TOGGLE_OPTIONS,
} from "@/components/demos/constants";

export function AppToggleGroupDemo() {
  const [alignment, setAlignment] = useState("left");
  const [device, setDevice] = useState("desktop");

  return (
    <DemoSection
      scope="app"
      title="Toggle Group"
      description="Exclusive icon toggle group for a single selected value"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Alignment">
          <AppToggleGroup
            value={alignment}
            onValueChange={setAlignment}
            options={ALIGNMENT_TOGGLE_OPTIONS}
          />
        </DemoBlock>

        <DemoBlock scope="app" title="Device">
          <AppToggleGroup
            value={device}
            onValueChange={setDevice}
            options={DEVICE_TOGGLE_OPTIONS}
          />
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

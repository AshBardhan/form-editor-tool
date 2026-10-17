"use client";

import { useState } from "react";
import { AppSelect } from "@/design-system/app/AppSelect";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  APP_SELECT_SIZES,
  INITIAL_APP_SELECT_VALUES,
  SELECT_OPTIONS,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function AppSelectDemo() {
  const [values, setValues] = useState(INITIAL_APP_SELECT_VALUES);

  return (
    <DemoSection
      scope="app"
      title="Select"
      description="Dropdown selection component"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Single Select">
          <div className="flex flex-col gap-2">
            {APP_SELECT_SIZES.map((size) => (
              <div key={size} className="flex flex-col gap-1">
                <span className="text-xs font-medium text-app-fg-muted">
                  {SELECT_SIZE_LABELS[size]}
                </span>
                <AppSelect
                  size={size}
                  items={SELECT_OPTIONS}
                  value={values[size]}
                  placeholder="Choose status"
                  onValueChange={(next) => {
                    if (!next) return;
                    setValues((current) => ({
                      ...current,
                      [size]: next,
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

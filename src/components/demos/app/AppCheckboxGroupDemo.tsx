"use client";

import { useState } from "react";
import { AppCheckboxGroup } from "@/design-system/app/AppCheckboxGroup";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  APP_CHOICE_SIZES,
  NOTIFICATION_OPTIONS,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function AppCheckboxGroupDemo() {
  const [values, setValues] = useState<string[]>(["email"]);

  return (
    <DemoSection
      scope="app"
      title="Checkbox Group"
      description="Multiple checkboxes with a shared legend"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Orientation">
          <div className="flex flex-col gap-6">
            <AppCheckboxGroup
              label="Notifications"
              options={NOTIFICATION_OPTIONS}
              value={values}
              onValueChange={setValues}
            />
            <AppCheckboxGroup
              label="Horizontal"
              orientation="horizontal"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["sms"]}
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="States">
          <div className="flex flex-col gap-6">
            <AppCheckboxGroup
              label="Invalid"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["email"]}
              aria-invalid
              required
            />
            <AppCheckboxGroup
              label="Disabled"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["email"]}
              disabled
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
          <div className="flex flex-col gap-6">
            {APP_CHOICE_SIZES.map((size) => (
              <AppCheckboxGroup
                key={size}
                size={size}
                label={SELECT_SIZE_LABELS[size]}
                orientation="horizontal"
                options={NOTIFICATION_OPTIONS}
                defaultValue={["email"]}
              />
            ))}
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

"use client";

import { useState } from "react";
import { FormCheckboxGroup } from "@/design-system/form/FormCheckboxGroup";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  FORM_CHOICE_SIZES,
  NOTIFICATION_OPTIONS,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function FormCheckboxGroupDemo() {
  const [values, setValues] = useState<string[]>(["email"]);

  return (
    <DemoSection
      scope="form"
      title="Checkbox Group"
      description="Multiple checkboxes with a shared legend"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Orientation">
          <div className="flex flex-col gap-6">
            <FormCheckboxGroup
              label="Notifications"
              options={NOTIFICATION_OPTIONS}
              value={values}
              onValueChange={setValues}
            />
            <FormCheckboxGroup
              label="Horizontal"
              orientation="horizontal"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["sms"]}
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="States">
          <div className="flex flex-col gap-6">
            <FormCheckboxGroup
              label="Invalid"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["email"]}
              aria-invalid
              required
            />
            <FormCheckboxGroup
              label="Disabled"
              options={NOTIFICATION_OPTIONS}
              defaultValue={["email"]}
              disabled
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
          <div className="flex flex-col gap-6">
            {FORM_CHOICE_SIZES.map((size) => (
              <FormCheckboxGroup
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

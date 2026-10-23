"use client";

import { useState } from "react";
import { FormSelect } from "@/design-system/form/FormSelect";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";
import {
  FORM_SELECT_SIZES,
  INITIAL_FORM_SELECT_VALUES,
  SELECT_OPTIONS,
  SELECT_SIZE_LABELS,
} from "@/components/demos/constants";

export function FormSelectDemo() {
  const [values, setValues] = useState(INITIAL_FORM_SELECT_VALUES);

  return (
    <DemoSection
      scope="form"
      title="Select"
      description="Dropdown selection component"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Single Select">
          <div className="flex flex-col gap-2">
            {FORM_SELECT_SIZES.map((size) => (
              <div key={size} className="flex flex-col gap-1">
                <span className="text-xs font-medium text-form-fg-muted">
                  {SELECT_SIZE_LABELS[size]}
                </span>
                <FormSelect
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

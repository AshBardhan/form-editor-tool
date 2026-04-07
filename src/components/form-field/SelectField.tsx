"use client";

import { FormField } from "@/types/form.types";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { JSX } from "react";
import { getPropValue } from "@/lib/utils/fieldUtils";

interface SelectFieldProps {
  field: FormField;
}

/**
 * Select Field
 * - Displays a select element with options and a label
 *
 * @param {SelectFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SelectField = ({ field }: SelectFieldProps): JSX.Element => {
  const label = getPropValue(field, "label");
  const options = (getPropValue(field, "options") ?? []) as string[];
  const value = (getPropValue(field, "value") ?? "") as string;
  const placeholder = (getPropValue(field, "placeholder") ?? "") as string;

  return (
    <div className="form-field flex flex-col gap-2">
      {label && <Label htmlFor={`select-${field.id}`}>{label}</Label>}
      <Select value={value}>
        <SelectTrigger
          id={`select-${field.id}`}
          className="w-full"
          tabIndex={-1}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: string, idx: number) => (
            <SelectItem key={idx} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { SelectField };

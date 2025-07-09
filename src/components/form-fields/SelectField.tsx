"use client";

import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import React from "react";
import { getPropValue } from "@/lib/utils/fieldUtils";

interface SelectFieldProps {
  field: FormField;
}

const SelectField = ({ field }: SelectFieldProps) => {
  const label = getPropValue(field, "label");
  const options = getPropValue(field, "options") ?? [];
  const value = getPropValue(field, "value") ?? "";

  return (
    <div className="flex flex-col gap-2 py-2">
      {label && <Label htmlFor={field.id}>{label}</Label>}
      <Select value={value}>
        <SelectTrigger id={field.id} className="w-full">
          <SelectValue placeholder="Select an option" />
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

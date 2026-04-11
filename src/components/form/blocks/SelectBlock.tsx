"use client";

import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { JSX } from "react";
import { getPropValue } from "@/lib/utils/formUtils";

interface SelectBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Select Block
 * - Displays a select element with options and a label
 *
 * @param {SelectBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const SelectBlock = ({
  block,
  editable = false,
  value,
  onChange,
}: SelectBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const options = (getPropValue(block, "options") ?? []) as string[];
  const defaultValue = (getPropValue(block, "value") ?? "") as string;
  const controlledValue = value ?? defaultValue;
  const placeholder = (getPropValue(block, "placeholder") ?? "") as string;

  return (
    <div className="form-block flex flex-col gap-2">
      {label && <Label htmlFor={`select-${block.id}`}>{label}</Label>}
      <Select value={controlledValue} onValueChange={onChange}>
        <SelectTrigger
          id={`select-${block.id}`}
          className="w-full"
          tabIndex={editable ? 0 : -1}
          disabled={!editable}
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

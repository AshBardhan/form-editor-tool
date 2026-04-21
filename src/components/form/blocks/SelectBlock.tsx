"use client";

import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import { ErrorMessages } from "@/components/form/ErrorMessages";
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
  errors?: string[];
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
  errors = [],
}: SelectBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = getPropValue(block, "required") || false;
  const options = (getPropValue(block, "options") ?? []) as string[];
  const blockValue = (getPropValue(block, "value") ?? "") as string;
  const defaultValue = required ? blockValue || options[0] || "" : blockValue;
  const controlledValue = value ?? defaultValue;
  const placeholder = (getPropValue(block, "placeholder") ?? "") as string;

  return (
    <div className="form-block flex flex-col gap-1.5 @sm:gap-2">
      {label && (
        <Label htmlFor={`select-${block.id}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Select value={controlledValue} onValueChange={onChange}>
        <SelectTrigger
          id={`select-${block.id}`}
          className="w-full"
          tabIndex={editable ? 0 : -1}
          disabled={!editable}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((opt: string, idx: number) => (
            <SelectItem key={idx} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessages errors={errors} />
    </div>
  );
};

"use client";

import { FormBlock } from "@/lib/types/form";
import { FormLabel } from "@/design-system/form/FormLabel";
import { FormSelect } from "@/design-system/form/FormSelect";
import { FormError } from "@/design-system/form/FormError";
import { JSX } from "react";
import { getFieldKey, getPropValue } from "@/lib/utils/formUtils";

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
  const required = Boolean(getPropValue(block, "required"));
  const options = (getPropValue(block, "options") ?? []) as string[];
  const blockValue = (getPropValue(block, "value") ?? "") as string;
  const controlledValue = value ?? blockValue;
  const placeholder = (getPropValue(block, "placeholder") ?? "") as string;
  const fieldName = getFieldKey(block);
  const selectId = `select-${block.id}`;
  const errorId = `${selectId}-error`;
  const invalid = errors.length > 0;

  return (
    <div className="form-block flex flex-col gap-1.5 @sm:gap-2">
      {label ? (
        <FormLabel
          htmlFor={selectId}
          required={required}
          aria-invalid={invalid}
        >
          {label}
        </FormLabel>
      ) : null}
      <FormSelect
        id={selectId}
        name={fieldName}
        items={options.map((option) => ({
          value: option,
          label: option,
        }))}
        value={controlledValue}
        placeholder={placeholder}
        required={required}
        disabled={!editable}
        tabIndex={editable ? 0 : -1}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        onValueChange={(next) => onChange?.(next ?? "")}
      />
      <FormError id={errorId} errors={errors} />
    </div>
  );
};

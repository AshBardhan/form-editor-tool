import { getFieldKey, getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { FormLabel } from "@/design-system/form/FormLabel";
import { FormInput } from "@/design-system/form/FormInput";
import { FormError } from "@/design-system/form/FormError";
import { ChangeEvent, JSX } from "react";

interface InputBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  errors?: string[];
}

function optionalNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

/**
 * Input Block component
 * - Displays an input element with an optional label
 *
 * @param {InputBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const InputBlock = ({
  block,
  editable = false,
  value,
  onChange,
  errors = [],
}: InputBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = Boolean(getPropValue(block, "required"));
  const placeholder = String(getPropValue(block, "placeholder") ?? "");
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue ?? "";
  const fieldName = getFieldKey(block);
  const inputId = `input-${block.id}`;
  const errorId = `${inputId}-error`;
  const invalid = errors.length > 0;
  const minLength = optionalNumber(getPropValue(block, "minLength"));
  const maxLength = optionalNumber(getPropValue(block, "maxLength"));
  const min = optionalNumber(getPropValue(block, "min"));
  const max = optionalNumber(getPropValue(block, "max"));
  const step = optionalNumber(getPropValue(block, "step"));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue =
      block.type === "number" ? e.target.valueAsNumber : e.target.value;
    onChange?.(nextValue);
  };

  return (
    <div className="form-block flex flex-col gap-1.5 @sm:gap-2">
      {label ? (
        <FormLabel htmlFor={inputId} required={required} aria-invalid={invalid}>
          {label}
        </FormLabel>
      ) : null}
      <FormInput
        id={inputId}
        name={fieldName}
        type={block.type}
        value={controlledValue}
        disabled={!editable}
        tabIndex={editable ? 0 : -1}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        onChange={handleChange}
      />
      <FormError id={errorId} errors={errors} />
    </div>
  );
};

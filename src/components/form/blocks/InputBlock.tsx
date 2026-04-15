import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { Input } from "@/components/ui/Input";
import { JSX } from "react";

interface InputBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
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
  const required = getPropValue(block, "required") || false;
  const placeholder = String(getPropValue(block, "placeholder"));
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue ?? "";

  return (
    <div className="form-block flex flex-col gap-2">
      {label && (
        <Label htmlFor={`input-${block.id}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={`input-${block.id}`}
        type={block.type}
        value={controlledValue}
        readOnly={!editable}
        tabIndex={editable ? 0 : -1}
        required={Boolean(required)}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <ErrorMessages errors={errors} />
    </div>
  );
};

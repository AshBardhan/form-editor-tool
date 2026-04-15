import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { Textarea } from "@/components/ui/Textarea";
import { JSX } from "react";

interface TextareaBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
}

/**
 * Textarea Block
 * - Displays a textarea element with an optional label
 *
 * @param {TextareaBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const TextareaBlock = ({
  block,
  editable = false,
  value,
  onChange,
  errors = [],
}: TextareaBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = getPropValue(block, "required") || false;
  const placeholder = String(getPropValue(block, "placeholder"));
  const rows = Number(getPropValue(block, "rows") || 3);
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue ?? "";

  return (
    <div className="form-block flex flex-col gap-2">
      {label && (
        <Label htmlFor={`textarea-${block.id}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Textarea
        id={`textarea-${block.id}`}
        className="resize-y"
        readOnly={!editable}
        tabIndex={editable ? 0 : -1}
        value={controlledValue}
        placeholder={placeholder}
        required={Boolean(required)}
        rows={rows}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <ErrorMessages errors={errors} />
    </div>
  );
};

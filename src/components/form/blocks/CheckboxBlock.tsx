import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { JSX } from "react";

interface CheckboxBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

/**
 * Checkbox Block
 * - Displays a checkbox and a label, with the label text
 *
 * @param {CheckboxBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CheckboxBlock = ({
  block,
  editable = false,
  value,
  onChange,
}: CheckboxBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = getPropValue(block, "required") || false;
  const defaultValue = getPropValue(block, "checked") as boolean | undefined;
  const controlledValue = value ?? defaultValue ?? false;

  return (
    <div className="form-block flex gap-2 items-center">
      <Checkbox
        readOnly={!editable}
        checked={controlledValue}
        id={`checkbox-${block.id}`}
        tabIndex={editable ? 0 : -1}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <Label htmlFor={`checkbox-${block.id}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    </div>
  );
};

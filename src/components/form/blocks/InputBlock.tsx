import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { JSX } from "react";

interface InputBlockProps {
  block: FormBlock;
}

/**
 * Input Block component
 * - Displays an input element with an optional label
 *
 * @param {InputBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const InputBlock = ({ block }: InputBlockProps): JSX.Element => {
  return (
    <div className="form-block flex flex-col gap-2">
      {getPropValue(block, "label") && (
        <Label htmlFor={`input-${block.id}`}>
          {getPropValue(block, "label")}
        </Label>
      )}
      <Input
        id={`input-${block.id}`}
        type={block.type}
        readOnly
        tabIndex={-1}
        required={Boolean(getPropValue(block, "required"))}
        placeholder={String(getPropValue(block, "placeholder"))}
      />
    </div>
  );
};

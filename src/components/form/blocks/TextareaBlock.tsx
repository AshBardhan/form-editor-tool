import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { JSX } from "react";

interface TextareaBlockProps {
  block: FormBlock;
  editable?: boolean;
  onChange?: (value: string) => void;
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
  onChange,
}: TextareaBlockProps): JSX.Element => {
  return (
    <div className="form-block flex flex-col gap-2">
      {getPropValue(block, "label") && (
        <Label htmlFor={`textarea-${block.id}`}>
          {getPropValue(block, "label")}
        </Label>
      )}
      <Textarea
        id={`textarea-${block.id}`}
        className="resize-y"
        readOnly={!editable}
        tabIndex={editable ? 0 : -1}
        value={String(getPropValue(block, "value") || "")}
        placeholder={String(getPropValue(block, "placeholder"))}
        required={Boolean(getPropValue(block, "required"))}
        rows={Number(getPropValue(block, "rows") || 3)}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

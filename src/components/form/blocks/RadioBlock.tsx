import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { JSX } from "react";

interface RadioBlockProps {
  block: FormBlock;
}

/**
 * Radio Block
 * - Displays a group of radio buttons with labels
 *
 * @param {RadioBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const RadioBlock = ({ block }: RadioBlockProps): JSX.Element => {
  const alignment = (getPropValue(block, "alignment") ?? "vertical") as
    | "horizontal"
    | "vertical";
  const options = (getPropValue(block, "options") ?? []) as string[];

  return (
    <RadioGroup
      name={`radio-${block.id}`}
      alignment={alignment}
      className="form-block"
    >
      {options.map((option: string) => (
        <div key={option} className="flex items-center gap-2">
          <RadioGroupItem
            value={option}
            readOnly
            tabIndex={-1}
            id={`radio-${block.id}-${option}`}
          ></RadioGroupItem>
          <Label htmlFor={`radio-${block.id}-${option}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

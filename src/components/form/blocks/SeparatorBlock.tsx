import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Separator } from "@/components/ui/Separator";
import { JSX } from "react";

interface SeparatorBlockProps {
  block: FormBlock;
}

/**
 * Separator Block
 * - Displays a separator with optional spacing and a divider
 *
 * @param {SeparatorBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const SeparatorBlock = ({ block }: SeparatorBlockProps): JSX.Element => {
  const spacing = Number(getPropValue(block, "spacing") ?? 20);
  const divider = Boolean(getPropValue(block, "divider"));

  return (
    <div
      className="mx-6"
      style={{ paddingTop: spacing, paddingBottom: spacing }}
    >
      {divider && <Separator />}
    </div>
  );
};

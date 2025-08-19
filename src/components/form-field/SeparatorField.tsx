import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/form-field";
import { Separator } from "@/components/ui/Separator";
import { JSX } from "react";

interface SeparatorFieldProps {
  field: FormField;
}

/**
 * Separator Field
 * - Displays a separator with optional spacing and a divider
 *
 * @param {SeparatorFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SeparatorField = ({ field }: SeparatorFieldProps): JSX.Element => {
  const spacing = Number(getPropValue(field, "spacing") ?? 20);
  const divider = Boolean(getPropValue(field, "divider"));

  return (
    <div
      className="mx-6"
      style={{ paddingTop: spacing, paddingBottom: spacing }}
    >
      {divider && <Separator />}
    </div>
  );
};

export { SeparatorField };

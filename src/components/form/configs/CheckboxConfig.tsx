import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

interface CheckboxConfigProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

/**
 * Checkbox Config
 * - Displays a checkbox and a label with a change handler
 *
 * @param {CheckboxConfigProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CheckboxConfig = ({
  id,
  label,
  value,
  onChange,
}: CheckboxConfigProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

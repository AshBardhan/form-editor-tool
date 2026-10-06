import { AppCheckbox } from "@/design-system/app/AppCheckbox";

interface CheckboxConfigProps {
  id: string;
  label: string;
  value: boolean;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
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
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  onChange,
}: CheckboxConfigProps) => {
  return (
    <AppCheckbox
      id={id}
      label={label}
      checked={Boolean(value)}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      onCheckedChange={onChange}
    />
  );
};

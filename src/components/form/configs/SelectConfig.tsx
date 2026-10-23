import { AppSelect } from "@/design-system/app/AppSelect";

interface SelectConfigProps {
  id: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  onChange: (value: string | number | null) => void;
}

/**
 * Select Config
 * - Displays a select input with given options and value with a change handler.
 *
 * @param {SelectConfigProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const SelectConfig = ({
  id,
  value,
  options,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  onChange,
}: SelectConfigProps) => {
  return (
    <AppSelect
      id={id}
      items={options}
      value={value}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      onValueChange={onChange}
    />
  );
};

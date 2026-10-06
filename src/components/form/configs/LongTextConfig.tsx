import { AppTextArea } from "@/design-system/app/AppTextArea";

interface LongTextConfigProps {
  id: string;
  value: string;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  onChange: (val: string) => void;
}

/**
 * Long Text Config
 * - Displays a textarea with an optional class name and change handler
 *
 * @param {LongTextConfigProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const LongTextConfig = ({
  id,
  value,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  onChange,
}: LongTextConfigProps) => {
  return (
    <AppTextArea
      id={id}
      value={value}
      className={className}
      rows={10}
      placeholder="Enter a long text"
      disabled={disabled}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

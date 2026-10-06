import { AppInput } from "@/design-system/app/AppInput";

interface InputConfigProps {
  type?: "text" | "number";
  id: string;
  value: string | number;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  onChange: (val: string | number) => void;
}

/**
 * Input Config
 * - Displays an input with a label, optional class name and change handler
 *
 * @param {InputConfigProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const InputConfig = ({
  type = "text",
  id,
  value,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  onChange,
}: InputConfigProps) => {
  return (
    <AppInput
      id={id}
      type={type}
      value={value}
      className={className}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      onChange={(e) =>
        onChange(
          type === "number"
            ? parseInt(e.target.value || "0", 10)
            : e.target.value,
        )
      }
    />
  );
};

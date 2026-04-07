import { Textarea } from "@/components/ui/Textarea";

interface LongTextConfigProps {
  id: string;
  value: string;
  className?: string;
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
  onChange,
}: LongTextConfigProps) => {
  return (
    <Textarea
      id={id}
      value={value}
      className={className}
      rows={10}
      placeholder="Enter a long text"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

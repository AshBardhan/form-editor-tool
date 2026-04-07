import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface SelectConfigProps {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
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
  onChange,
}: SelectConfigProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        className="w-full focus-visible:ring-0 focus-visible:!shadow-none"
      >
        <SelectValue>
          {options?.find((opt) => opt.value === value)?.label ?? value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

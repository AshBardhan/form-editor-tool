import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface SelectPropEditorProps {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

const SelectPropEditor = ({
  id,
  value,
  options,
  onChange,
}: SelectPropEditorProps) => {
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

export { SelectPropEditor };

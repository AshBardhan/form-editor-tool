import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

interface CheckboxPropEditorProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

const CheckboxPropEditor = ({
  id,
  label,
  value,
  onChange,
}: CheckboxPropEditorProps) => {
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

export { CheckboxPropEditor };

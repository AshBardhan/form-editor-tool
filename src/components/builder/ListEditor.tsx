import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface ListEditorProps {
  value: string[];
  onChange: (val: string[]) => void;
}

export const ListEditor = ({ value, onChange }: ListEditorProps) => {
  const [newOption, setNewOption] = useState("");

  const addOption = () => {
    const trimmed = newOption.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setNewOption("");
  };

  const updateOption = (index: number, newVal: string) => {
    const updated = [...value];
    updated[index] = newVal;
    onChange(updated);
  };

  const removeOption = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value.map((option, i) => (
        <div key={i} className="relative">
          <Input
            type="text"
            value={option}
            onChange={(e) => updateOption(i, e.target.value)}
            className="pl-3 pr-8 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
          />
          <Button
            type="button"
            onClick={() => removeOption(i)}
            className="absolute right-0 top-1/2 -translate-y-1/2"
            disabled={value.length <= 2}
          >
            <TrashIcon size={12} />
          </Button>
        </div>
      ))}
      <Input
        type="text"
        placeholder="New option"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
      />
    </div>
  );
};

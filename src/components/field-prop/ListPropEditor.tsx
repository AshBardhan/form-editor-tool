"use client";

import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ListPropEditorProps {
  id: string;
  value: string[];
  onChange: (val: string[]) => void;
}

/**
 * List Editor
 * - Displays a list of input box for editing options.
 *
 * @param {ListPropEditorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered  component.
 */
const ListPropEditor = ({ id, value, onChange }: ListPropEditorProps) => {
  const [newOption, setNewOption] = useState("");

  /** Add a new option */
  const addOption = () => {
    const trimmed = newOption.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setNewOption("");
  };

  /** Update an option */
  const updateOption = (index: number, newVal: string) => {
    const updated = [...value];
    updated[index] = newVal;
    onChange(updated);
  };

  /** Remove an option */
  const removeOption = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  /** Handle Enter keypress event to add a new option */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption();
    }
  };

  /** Reset new option input on changing form field */
  useEffect(() => {
    setNewOption("");
  }, [id]);

  return (
    <div id={id} className="flex flex-col gap-2">
      {/* List of existing options input with delete button */}
      {value.map((option, i) => (
        <div key={i} className="relative">
          <Input
            type="text"
            value={option}
            onChange={(e) => updateOption(i, e.target.value)}
            className={`pr-8 py-2 focus-visible:ring-0 focus-visible:!shadow-none ${option.length === 0 && "!border-destructive"}`}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeOption(i)}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none"
            disabled={value.length <= 2}
          >
            <TrashIcon size={12} />
          </Button>
        </div>
      ))}
      {/* New option input field */}
      <Input
        type="text"
        placeholder="New option"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={handleKeyDown}
        className="focus-visible:ring-0 focus-visible:!shadow-none"
      />
    </div>
  );
};

export { ListPropEditor };

"use client";

import { TrashIcon } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { AppInput } from "@/design-system/app/AppInput";
import { Fieldset } from "@/design-system/primitives";

interface ListConfigProps {
  id: string;
  value: string[];
  labelledBy?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  onChange: (val: string[]) => void;
}

/**
 * List Config
 * - Displays a list of input box for editing options.
 *
 * @param {ListConfigProps} props - The props for the component.
 * @returns {JSX.Element} The rendered  component.
 */
export const ListConfig = ({
  id,
  value,
  labelledBy,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  onChange,
}: ListConfigProps) => {
  const [newOption, setNewOption] = useState("");
  const newOptionId = `${id}-new`;
  const addHintId = `${id}-add-hint`;

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
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption();
    }
  };

  /** Reset new option input on changing form block */
  useEffect(() => {
    setNewOption("");
  }, [id]);

  return (
    <Fieldset
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={ariaDescribedBy}
      data-invalid={ariaInvalid || undefined}
      className="flex flex-col gap-2"
    >
      {value.map((option, i) => {
        const optionId = `${id}-option-${i}`;
        const empty = option.length === 0;

        return (
          <div key={optionId} className="relative">
            <AppInput
              id={optionId}
              type="text"
              value={option}
              aria-label={`Option ${i + 1}`}
              aria-invalid={empty || ariaInvalid}
              onChange={(e) => updateOption(i, e.target.value)}
              className="pr-10"
            />
            <AppButton
              type="button"
              variant="solid"
              color="negative"
              size="md"
              onClick={() => removeOption(i)}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none"
              disabled={value.length <= 2}
              aria-label={`Remove option ${i + 1}`}
            >
              <TrashIcon size={12} />
            </AppButton>
          </div>
        );
      })}
      <AppInput
        id={newOptionId}
        type="text"
        placeholder="New option"
        value={newOption}
        aria-label="New option"
        aria-describedby={addHintId}
        aria-keyshortcuts="Enter"
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span id={addHintId} className="sr-only">
        Press Enter to add a new option.
      </span>
    </Fieldset>
  );
};

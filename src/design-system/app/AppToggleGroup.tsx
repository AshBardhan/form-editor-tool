import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/styleUtils";
import { Toggle, ToggleGroup } from "@/design-system/primitives";

export interface AppToggleGroupOption {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface AppToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: AppToggleGroupOption[];
}

export function AppToggleGroup({
  value,
  onValueChange,
  options,
}: AppToggleGroupProps) {
  return (
    <ToggleGroup
      aria-label="Toggle group"
      value={[value]}
      onValueChange={(groupValue) => {
        const nextValue = groupValue[0];
        if (!nextValue) return;
        onValueChange(nextValue);
      }}
      data-slot="app-toggle-group"
      className="inline-flex overflow-hidden rounded-md border border-app-border-subtle bg-app-surface-muted text-app-fg"
    >
      {options.map((option) => {
        const Icon = option.icon;

        return (
          <Toggle
            key={option.value}
            value={option.value}
            title={option.label}
            aria-label={option.label}
            data-slot="app-toggle"
            className={cn(
              "flex items-center justify-center border-none rounded-none bg-transparent p-3 cursor-pointer select-none transition-all outline-none",
              "hover:not-data-disabled:bg-app-surface-strong",
              "data-pressed:bg-app-surface data-pressed:text-app-fg",
              "data-pressed:hover:not-data-disabled:bg-app-surface",
              "focus-visible:relative focus-visible:z-1 focus-visible:ring-[3px] focus-visible:ring-app-brand/30",
              "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            )}
          >
            <Icon size={14} />
          </Toggle>
        );
      })}
    </ToggleGroup>
  );
}

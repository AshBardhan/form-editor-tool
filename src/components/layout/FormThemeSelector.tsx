"use client";

import { FORM_THEMES, FORM_THEME_LABELS } from "@/lib/constants/themes";
import type { FormTheme } from "@/lib/types/themes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

interface FormThemeSelectorProps {
  value?: FormTheme;
  onChange?: (theme: FormTheme) => void;
}

export function FormThemeSelector({
  value = "light",
  onChange,
}: FormThemeSelectorProps) {
  const handleThemeChange = (theme: string) => {
    onChange?.(theme as FormTheme);
  };

  return (
    <Select value={value} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-40 bg-app-surface text-app-fg border-app-border-subtle">
        <SelectValue placeholder="Form Theme">
          {value ? FORM_THEME_LABELS[value] : "Form Theme"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {FORM_THEMES.map((theme) => (
          <SelectItem key={theme} value={theme}>
            {FORM_THEME_LABELS[theme]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

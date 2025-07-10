"use client";

import { useFormStore } from "@/lib/store";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { THEME_OPTIONS } from "@/lib/constants/theme";
import { ListEditor } from "./ListEditor";

const FormEditorSidebar = () => {
  const { form, selectedFieldId, updateField, updateForm } = useFormStore();
  const selected = form.fields.find((f) => f.id === selectedFieldId);

  const onThemeChange = (value: string) => {
    const html = document.documentElement;
    if (value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    updateForm("theme", value);
  };

  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold">{selected ? "Field" : "Form"} Editor</h2>
      </div>
      {selected ? (
        <div className="p-4 flex flex-col gap-4">
          {selected.props.map((prop) => (
            <div
              className="flex flex-col gap-2 focus-within:!shadow-none"
              key={prop.key}
            >
              {prop.type !== "boolean" && (
                <Label htmlFor={prop.key} className="font-semibold">
                  {prop.label}
                </Label>
              )}

              {/* Type-specific rendering */}
              {prop.type === "string" && (
                <Input
                  id={prop.key}
                  value={prop.value ?? ""}
                  className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
                  onChange={(e) =>
                    updateField(selected.id, prop.key, e.target.value)
                  }
                />
              )}

              {prop.type === "number" && (
                <Input
                  id={prop.key}
                  type="number"
                  value={prop.value ?? 0}
                  className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
                  onChange={(e) =>
                    updateField(
                      selected.id,
                      prop.key,
                      parseInt(e.target.value || "0", 10),
                    )
                  }
                />
              )}

              {prop.type === "boolean" && (
                <div className="flex items-center gap-2 mt-1">
                  <Checkbox
                    id={prop.key}
                    checked={Boolean(prop.value)}
                    onChange={(e) =>
                      updateField(selected.id, prop.key, e.target.checked)
                    }
                  />
                  <Label htmlFor={prop.key} className="text-sm">
                    {prop.label}
                  </Label>
                </div>
              )}

              {prop.type === "list" && Array.isArray(prop.value) && (
                <ListEditor
                  value={prop.value}
                  onChange={(val) => updateField(selected.id, prop.key, val)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="form-title" className="font-semibold">
              Title
            </Label>
            <Input
              id="form-title"
              value={form.title}
              className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
              onChange={(e) => updateForm("title", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="form-theme" className="font-semibold">
              Theme
            </Label>
            <Select value={form.theme} onValueChange={onThemeChange}>
              <SelectTrigger
                id="form-theme"
                className="px-3 py-2 w-full rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] focus-visible:ring-0 focus-visible:!shadow-none"
              >
                <SelectValue placeholder="Select theme">
                  {THEME_OPTIONS[form.theme]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(THEME_OPTIONS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};

export { FormEditorSidebar };

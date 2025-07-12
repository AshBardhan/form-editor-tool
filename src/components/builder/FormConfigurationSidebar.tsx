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
import { Textarea } from "@/components/ui/Textarea";
import { getField } from "@/lib/utils/fieldUtils";
import { ScrollTextIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import z from "zod";

/**
 * Form Configuration Sidebar
 * - Provides a right sidebar for configuring form fields.
 * - Allows users to edit properties of selected form fields and update form settings.
 *
 * @returns {JSX.Element} The rendered component.
 */
const FormConfigurationSidebar = (): JSX.Element => {
  const {
    form,
    selectedFieldId,
    updateField,
    updateForm,
    setFieldErrors,
    clearFieldErrors,
  } = useFormStore();
  const selected = form.fields.find((f) => f.id === selectedFieldId);
  const selectedMeta = selected ? getField(selected.type) : null;
  const Icon = selectedMeta?.icon ?? ScrollTextIcon;
  const schema = selectedMeta?.schema;

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /**
   * Handles theme change for the form.
   *
   * @param {string} value - The selected theme value.
   */
  const onThemeChange = (value: string) => {
    const html = document.documentElement;
    if (value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    updateForm("theme", value);
  };

  /**
   * Validates the properties of the selected field against its schema.
   */
  const validateProps = () => {
    if (!selected || !schema) return;

    const rawData = selected.props.reduce(
      (acc, prop) => {
        acc[prop.key] = prop.value;
        return acc;
      },
      {} as Record<string, any>,
    );

    const result = schema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors as Record<
        string,
        string[]
      >;
      setErrors(fieldErrors);
      const combined = Object.entries(fieldErrors).flatMap(([_, msgs]) => msgs);
      setFieldErrors(selected.id, combined);
    } else {
      setErrors({});
      clearFieldErrors(selected.id);
    }
  };

  /**
   * Checks if a property has validation errors.
   *
   * @param {string} propKey - The key of the property to check.
   * @returns {boolean} True if the property has errors, otherwise false.
   */
  const hasErrorProp = (propKey: string) =>
    errors && errors[propKey] && errors[propKey].length;

  useEffect(() => {
    validateProps();
  }, [selected?.props]);

  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold flex items-center gap-2">
          {Icon && <Icon size={20} />}
          {selected ? `${selectedMeta?.label}` : "Form"} Configuration
        </h2>
      </div>
      {selected ? (
        <>
          {/* Field Configuration Section */}
          <div className="p-4 flex flex-col gap-4 dark">
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

                {/* Text input rendering */}
                {prop.type === "string" && (
                  <Input
                    id={prop.key}
                    value={prop.value ?? ""}
                    className={`focus-visible:ring-0 focus-visible:!shadow-none ${hasErrorProp(prop.key) ? "!border-destructive" : ""}`}
                    onChange={(e) =>
                      updateField(selected.id, prop.key, e.target.value)
                    }
                  />
                )}

                {prop.type === "long-string" && (
                  <Textarea
                    id={prop.key}
                    value={prop.value ?? ""}
                    rows={10}
                    placeholder="Enter a long text"
                    className={`resize-y focus-visible:ring-0 focus-visible:!shadow-none ${hasErrorProp(prop.key) ? "!border-destructive" : ""}`}
                    onChange={(e) =>
                      updateField(selected.id, prop.key, e.target.value)
                    }
                  />
                )}

                {/* Number input rendering */}
                {prop.type === "number" && (
                  <Input
                    id={prop.key}
                    type="number"
                    value={prop.value ?? 0}
                    className={`focus-visible:ring-0 focus-visible:!shadow-none ${hasErrorProp(prop.key) ? "!border-destructive" : ""}`}
                    onChange={(e) =>
                      updateField(
                        selected.id,
                        prop.key,
                        parseInt(e.target.value || "0", 10),
                      )
                    }
                  />
                )}

                {/* Checkbox rendering */}
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

                {/* Selectbox rendering */}
                {prop.type === "select" && (
                  <Select
                    value={prop.value}
                    onValueChange={(val) =>
                      updateField(selected.id, prop.key, val)
                    }
                  >
                    <SelectTrigger className="w-full focus-visible:ring-0 focus-visible:!shadow-none">
                      <SelectValue>
                        {prop.options?.find((opt) => opt.value === prop.value)
                          ?.label ?? prop.value}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {prop.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Listbox rendering */}
                {prop.type === "list" && Array.isArray(prop.value) && (
                  <ListEditor
                    value={prop.value}
                    onChange={(val) => updateField(selected.id, prop.key, val)}
                  />
                )}

                {/* Field Prop Validation Error Messages */}
                {hasErrorProp(prop.key) > 0 &&
                  errors[prop.key].map((error, idx) => (
                    <div key={idx} className="text-xs text-destructive">
                      {error}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Form Configuration Section */}
          <div className="p-4 flex flex-col gap-4 dark">
            <div className="flex flex-col gap-2">
              <Label htmlFor="form-title" className="font-semibold">
                Title
              </Label>
              <Input
                id="form-title"
                value={form.title}
                className="focus-visible:ring-0 focus-visible:!shadow-none"
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
                  className="w-full focus-visible:ring-0 focus-visible:!shadow-none"
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
        </>
      )}
    </>
  );
};

export { FormConfigurationSidebar };

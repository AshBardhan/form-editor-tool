"use client";

import { useFormStore } from "@/lib/store";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

const FormEditorSidebar = () => {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const selected = fields.find((f) => f.id === selectedFieldId);

  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold">Field Editor</h2>
      </div>
      {fields.length > 0 && (
        <>
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
                      className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] text-xs focus-visible:ring-0 focus-visible:!shadow-none"
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
                      className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] focus:bg-[#2f2f2f] text-xs focus-visible:ring-0 focus-visible:!shadow-none"
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
                </div>
              ))}
            </div>
          ) : (
            <div className="m-4 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] flex items-center justify-center text-xs h-20">
              Select a field to edit its properties
            </div>
          )}
        </>
      )}
    </>
  );
};

export { FormEditorSidebar };

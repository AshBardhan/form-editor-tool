"use client";

import { useFormStore } from "@/lib/store";

const FieldEditorSidebar = () => {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const selected = fields.find((f) => f.id === selectedFieldId);

  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold">Field Editor</h2>
      </div>
      {selected ? (
        <div className="flex flex-col gap-4 p-4">
          {selected.props.map((prop) => (
            <div className="flex flex-col gap-2" key={prop.key}>
              <label htmlFor={prop.key}>{prop.label}</label>
              <input
                id={prop.key}
                type={prop.type}
                value={String(prop.value ?? "")}
                className="border rounded px-2 py-1 w-full mb-2"
                onChange={(e) =>
                  updateField(
                    selected.id,
                    prop.key,
                    prop.type === "number"
                      ? parseInt(e.target.value || "0", 10)
                      : prop.type === "boolean"
                        ? e.target.checked
                        : e.target.value,
                  )
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="m-2 p-6 text-xs text-center rounded-md border border-[#2d2d2d] bg-[#1e1e1e]">
          <p>Select a field to edit its properties</p>
        </div>
      )}
    </>
  );
};

export { FieldEditorSidebar };

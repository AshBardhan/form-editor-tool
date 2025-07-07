"use client";

import { useFormStore } from "@/lib/store";

const FieldEditor = () => {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const selected = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Field Editor</h2>
      {selected ? (
        <>
          {selected.props.map((prop) => (
            <div className="flex flex-col mb-2" key={prop.key}>
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
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-700">Select a field to edit its properties</p>
        </div>
      )}
    </div>
  );
};

export { FieldEditor };

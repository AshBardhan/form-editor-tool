"use client";

import { FormField } from "@/types/field";
import { SortableField } from "./SortableField";

interface DroppableFieldPreviewProps {
  field: FormField;
  source: "sidebar" | "canvas" | null;
}

const DroppableFieldPreview = ({ field, source }: DroppableFieldPreviewProps) => {
  return (
    <>
      {field ? (
        source === "sidebar" ? (
          <div className="border border-dashed border-gray-400 bg-gray-100 text-sm text-gray-600 px-4 py-2 rounded">
            {field.name}
          </div>
        ) : (
          <SortableField isGhostMode={true} field={field} />
        )
      ) : null}
    </>
  );
};

export { DroppableFieldPreview };

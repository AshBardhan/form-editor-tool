"use client";

import { FormField } from "@/types/field";
import { SortableField } from "./SortableField";
import { JSX } from "react";

interface DroppableFieldPreviewProps {
  field: FormField;
  source: "sidebar" | "canvas" | null;
}

/**
 * Droppable Field Preview
 * - Displays a Drag Image Placeholder whether coming from the Component Sidebar or Form Canvas.
 *
 * @param {DroppableFieldPreviewProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null.
 */
const DroppableFieldPreview = ({
  field,
  source,
}: DroppableFieldPreviewProps): JSX.Element | null => {
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

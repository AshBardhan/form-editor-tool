"use client";

import { FormField } from "@/types/form.types";
import { SortableField } from "./SortableField";
import { JSX } from "react";
import { Component } from "@/types/component";

interface DroppableItemPreviewProps {
  item: FormField | Component;
  source: "sidebar" | "canvas" | null;
}

/**
 * Droppable Item Preview
 * - Displays a Drag Image Placeholder whether coming from the Component Sidebar or Form Canvas.
 *
 * @param {DroppableItemPreviewProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null.
 */
const DroppableItemPreview = ({
  item,
  source,
}: DroppableItemPreviewProps): JSX.Element | null => {
  if (!item) return null;

  if (source === "sidebar") {
    const Icon = (item as Component)?.icon;
    const label = (item as Component)?.label;

    return Icon && label ? (
      <div className="p-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] hover:bg-[#2f2f2f] text-white flex items-center gap-2">
        <div className="p-1 border border-[#2d2d2d] rounded inline-flex">
          <Icon size={14} />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
    ) : null;
  }

  return <SortableField isGhostMode={true} field={item as FormField} />;
};

export { DroppableItemPreview };

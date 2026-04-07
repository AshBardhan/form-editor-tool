"use client";

import { FormBlock } from "@/lib/types/form";
import { CanvasBlock } from "./CanvasBlock";
import { JSX } from "react";
import { Widget } from "@/lib/types/widget";

interface CanvasDroppableProps {
  item: FormBlock | Widget;
  source: "sidebar" | "canvas" | null;
}

/**
 * Canvas Droppable
 * - Displays a Drag Image Placeholder whether coming from the Widget Panel or Form Canvas.
 *
 * @param {CanvasDroppableProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null.
 */
const CanvasDroppable = ({
  item,
  source,
}: CanvasDroppableProps): JSX.Element | null => {
  if (!item) return null;

  if (source === "sidebar") {
    const Icon = (item as Widget)?.icon;
    const label = (item as Widget)?.label;

    return Icon && label ? (
      <div className="p-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] hover:bg-[#2f2f2f] text-white flex items-center gap-2">
        <div className="p-1 border border-[#2d2d2d] rounded inline-flex">
          <Icon size={14} />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
    ) : null;
  }

  return <CanvasBlock isGhostMode={true} block={item as FormBlock} />;
};

export { CanvasDroppable };

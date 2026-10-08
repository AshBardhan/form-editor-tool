"use client";

import { FormBlock } from "@/lib/types/form";
import { CanvasBlock } from "./CanvasBlock";
import { JSX } from "react";
import { Widget } from "@/lib/types/widget";
import { cn } from "@/lib/utils/styleUtils";

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
export const CanvasDroppable = ({
  item,
  source,
}: CanvasDroppableProps): JSX.Element | null => {
  if (!item) return null;

  if (source === "sidebar") {
    const Icon = (item as Widget)?.icon;
    const label = (item as Widget)?.label;

    return Icon && label ? (
      <div
        className={cn(
          "p-2 rounded-md flex items-center gap-2 cursor-move",
          "border border-app-border-subtle bg-app-surface text-app-sidebar-fg",
        )}
      >
        <div className="p-1 border border-[#2d2d2d] rounded inline-flex">
          <Icon size={12} />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
    ) : null;
  }

  // Wrap canvas block with container query context to maintain proper responsive sizing
  return (
    <div className="@container">
      <CanvasBlock isGhostMode={true} block={item as FormBlock} />
    </div>
  );
};

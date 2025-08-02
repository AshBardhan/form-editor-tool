"use client";

import { cn } from "@/lib/utils/styleUtils";
import { Component } from "@/types/component";
import { useDraggable } from "@dnd-kit/core";
import { JSX, memo } from "react";

interface DraggableComponentProps {
  component: Component;
}

/**
 * Draggable Component
 *
 * @param {DraggableComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const DraggableComponent = memo(function DraggableComponent({
  component,
}: DraggableComponentProps): JSX.Element {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.type,
    data: { ...component, from: "sidebar" },
  });
  const Icon = component.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      role="button"
      data-slot="component-item"
      className={cn(
        "p-2 rounded-md flex items-center gap-2 cursor-move",
        "border border-[#2d2d2d] bg-[#1e1e1e] text-white",
        "hover:bg-[#0f0f0f]",
        "focus-visible:border-white focus-visible:bg-[#0f0f0f] focus-visible:!shadow-none focus-visible:!outline-none",
        "transition-all",
      )}
    >
      {Icon && (
        <div className="p-1 border border-[#2d2d2d] rounded inline-flex">
          <Icon size={14} />
        </div>
      )}
      <span className="text-xs font-medium">{component.label}</span>
    </div>
  );
});

export { DraggableComponent };

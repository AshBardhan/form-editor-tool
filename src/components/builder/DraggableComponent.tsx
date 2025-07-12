"use client";

import { Component } from "@/types/component";
import { FormField } from "@/types/field";
import { useDraggable } from "@dnd-kit/core";
import { JSX } from "react";

interface DraggableComponentProps {
  component: Component;
}

/**
 * Draggable Component
 *
 * @param {DraggableComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const DraggableComponent = ({
  component,
}: DraggableComponentProps): JSX.Element => {
  const tempField: FormField = {
    id: "preview",
    type: component.type,
    name: component.label,
    props: [],
  };
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.type,
    data: { ...tempField, from: "sidebar" },
  });
  const Icon = component.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-slot="component-item"
      className="p-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] hover:bg-[#2f2f2f] cursor-move flex items-center gap-2"
    >
      {Icon && (
        <div className="p-1 border border-[#2d2d2d] rounded inline-flex">
          <Icon size={14} />
        </div>
      )}
      <span className="text-xs font-medium">{component.label}</span>
    </div>
  );
};

export { DraggableComponent };

"use client";

import { ComponentType } from "@/types/component";
import { useDraggable } from "@dnd-kit/core";

export function DraggableCard({ component }: { component: ComponentType }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.type,
    data: component,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 mb-2 border border-white rounded shadow-sm cursor-move bg-gray-300"
    >
      {component.label}
    </div>
  );
}

"use client";

import { ComponentType } from "@/types/component";
import { Field } from "@/types/field";
import { useDraggable } from "@dnd-kit/core";

export function DraggableCard({ component }: { component: ComponentType }) {
  const tempField: Field = {
    id: "preview",
    type: component.type,
    name: component.label,
    props: [],
  };
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.type,
    data: { ...tempField, from: "sidebar" },
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

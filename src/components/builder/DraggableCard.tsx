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
      className="px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#1e1e1e] hover:bg-[#2f2f2f] text-xs font-medium cursor-move"
    >
      {component.label}
    </div>
  );
}

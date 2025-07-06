"use client";

import { Field } from "@/lib/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";

type SortableFieldProps = {
  field: Field;
  onRemove: (id: string) => void;
};

export const SortableField = ({ field, onRemove }: SortableFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border rounded p-4 mb-2 bg-white shadow relative"
    >
      <div className="flex gap-2 items-center">
        <div
          {...listeners}
          className="flex-0 cursor-grab text-gray-400"
          title="Drag to reorder"
        >
          ⠿
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">{field.label}</label>
          {/* Render input based on field.type */}
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Field preview"
            disabled
          />
        </div>
      </div>

      <div
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500"
        onClick={(e) => {
          onRemove(field.id);
        }}
      >
        <Trash />
      </div>
    </div>
  );
};

"use client";

import { Field, useFormStore } from "@/lib/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";

type SortableFieldProps = {
  field: Field;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export const SortableField = ({
  field,
  onSelect,
  onRemove,
}: SortableFieldProps) => {
  const { selectedFieldId } = useFormStore();
  const isSelected = selectedFieldId === field.id;

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
    opacity: isDragging ? 1 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`rounded p-4 bg-white relative border ${
        isSelected ? "border-blue-500" : "border-gray-200"
      }`}
      onClick={() => {
        onSelect(field.id);
      }}
    >
      <div className="flex gap-2 items-center">
        <div
          {...listeners}
          className="flex-0 cursor-grab text-gray-400"
          title="Drag to reorder"
        >
          <GripVertical className=" text-gray-500 hover:text-black" />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1" htmlFor={field.id}>
            {field.label}
          </label>
          {/* Render input based on field.type */}
          <input
            id={field.id}
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Field preview"
          />
        </div>
      </div>

      <div
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(field.id);
        }}
      >
        <Trash />
      </div>
    </div>
  );
};

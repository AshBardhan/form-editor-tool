"use client";

import { useFormStore } from "@/lib/store";
import { Field } from "@/types/field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Trash } from "lucide-react";

interface SortableFieldProps {
  field: Field;
}

const getPropValue = (field: Field, key: string) =>
  field.props.find((p) => p.key === key)?.value ?? "";

const renderField = (field: Field) => {
  switch (field.type) {
    case "text":
      return (
        <div className="flex flex-col gap-1">
          {getPropValue(field, "label") && (
            <label className="block mb-1 font-medium">
              {getPropValue(field, "label")}
            </label>
          )}
          <input
            type="text"
            placeholder={String(getPropValue(field, "placeholder"))}
            disabled
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col gap-1">
          {getPropValue(field, "label") && (
            <label className="block mb-1 font-medium">
              {getPropValue(field, "label")}
            </label>
          )}
          <textarea
            placeholder={String(getPropValue(field, "placeholder"))}
            rows={Number(getPropValue(field, "rows") || 3)}
            disabled
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex gap-2 items-center">
          <input type="checkbox" disabled />
          <label>{getPropValue(field, "label")}</label>
        </div>
      );
  }
};

export const SortableField = ({ field }: SortableFieldProps) => {
  const {
    selectedFieldId,
    hoveredFieldId,
    selectField,
    hoverField,
    cloneField,
    removeField,
  } = useFormStore();
  const isSelected = selectedFieldId === field.id;
  const isHovered = hoveredFieldId === field.id;

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
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`rounded p-4 bg-white relative border ${
        isSelected ? "border-blue-500" : "border-transparent"
      }`}
      onMouseEnter={() => !isDragging && hoverField(field.id)}
      onMouseLeave={() => !isDragging && hoverField(null)}
      onClick={() => !isDragging && selectField(field.id)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-blue-300 opacity-30 pointer-events-none" />
      )}
      <div className="flex gap-2 items-center">
        <div
          {...listeners}
          className="flex-0 cursor-grab text-gray-400"
          title="Drag to reorder"
        >
          <GripVertical className=" text-gray-500 hover:text-black" />
        </div>
        <div className="flex-1 pointer-events-none relative">
          {renderField(field)}
        </div>

        <div className="flex-0 flex gap-1">
        <div
          className="cursor-pointer text-gray-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            cloneField(field.id);
          }}
        >
          <Copy />
        </div>
        <div
          className="cursor-pointer text-gray-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
        >
          <Trash />
        </div>

        </div>
      </div>
    </div>
  );
};

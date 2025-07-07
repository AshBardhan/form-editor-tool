"use client";

import { useFormStore } from "@/lib/store";
import { Field } from "@/types/field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Trash } from "lucide-react";
import { fieldRenderers } from "@/components/form-fields";
import { CSSProperties } from "react";

interface SortableFieldProps {
  field: Field;
}

const renderField = (field: Field) => {
  const Renderer = fieldRenderers[field.type];
  return Renderer ? <Renderer field={field} /> : null;
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
  } = useSortable({
    id: field.id,
    data: {
      ...field,
      from: "canvas",
    },
  });

  const style: CSSProperties = {
    transform: transform
      ? CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 })
      : "",
    transition,
    opacity: isDragging ? 0 : 1,
    visibility: isDragging ? "hidden" : "visible",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`rounded bg-white relative border ${
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

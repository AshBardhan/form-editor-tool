"use client";

import { useFormStore } from "@/lib/store";
import { FormField } from "@/types/field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripHorizontal, Trash } from "lucide-react";
import { fieldRenderers } from "@/components/form-fields";
import { CSSProperties } from "react";

interface SortableFieldProps {
  field: FormField;
  isGhostMode?: boolean;
}

export const SortableField = ({
  field,
  isGhostMode = false,
}: SortableFieldProps) => {
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

  const renderField = (field: FormField) => {
    const Renderer = fieldRenderers[field.type];
    return Renderer ? <Renderer field={field} /> : null;
  };

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
      data-slot="field"
      data-id={field.id}
      className={`rounded bg-white relative border ${
        isSelected ? "border-blue-500" : "border-transparent"
      }`}
      onMouseEnter={() => !isDragging && hoverField(field.id)}
      onMouseLeave={() => !isDragging && hoverField(null)}
      onClick={() => !isDragging && selectField(field.id)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-blue-200 opacity-30 pointer-events-none" />
      )}

      <div className="pointer-events-none">{renderField(field)}</div>

      {!isGhostMode && (
        <div
          className={`transition ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div
            {...listeners}
            className="absolute top-0 left-1/2 -translate-x-1/2 cursor-grab p-1 text-gray-500 hover:text-black"
            title="Drag to reorder"
          >
            <GripHorizontal size={20} />
          </div>

          <div className="absolute top-0 right-0 flex gap-2 p-2">
            <div
              role="button"
              className="cursor-pointer text-gray-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                cloneField(field.id);
              }}
            >
              <Copy size={14} />
            </div>
            <div
              role="button"
              className="cursor-pointer text-gray-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                removeField(field.id);
              }}
            >
              <Trash size={14} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

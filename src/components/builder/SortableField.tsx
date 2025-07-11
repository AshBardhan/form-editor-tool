"use client";

import { useFormStore } from "@/lib/store";
import { FormField } from "@/types/field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, SeparatorHorizontalIcon, TrashIcon } from "lucide-react";
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

  const { fieldErrors } = useFormStore();
  const isInvalid = fieldErrors[field.id]?.length > 0;

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
      className={`rounded relative border transition ${
        isInvalid
          ? "border-destructive min-h-10 bg-destructive/5"
          : isSelected
            ? "border-blue-500 dark:border-gray-300"
            : "border-transparent"
      }`}
      onMouseEnter={() => !isDragging && hoverField(field.id)}
      onMouseLeave={() => !isDragging && hoverField(null)}
      onClick={() => !isDragging && selectField(field.id)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-blue-200 dark:bg-white opacity-30 pointer-events-none" />
      )}

      <div className={`pointer-events-none ${isHovered ? "opacity-40" : ""}`}>
        {renderField(field)}
      </div>

      {!isGhostMode && (
        <div
          className={`transition ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div
            {...listeners}
            className="absolute top-1/2 left-1/2 -translate-1/2 cursor-grab p-1 text-gray-500 dark:text-gray-100 hover:text-black dark:hover:text-white"
            title="Rearrange Field"
          >
            <SeparatorHorizontalIcon size={24} />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex gap-2 p-2">
            {!isInvalid && (
              <div
                role="button"
                className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  cloneField(field.id);
                }}
                title="Duplicate Field"
              >
                <CopyIcon size={16} />
              </div>
            )}
            <div
              role="button"
              className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                removeField(field.id);
              }}
              title="Delete Field"
            >
              <TrashIcon size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

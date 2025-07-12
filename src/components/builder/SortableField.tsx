"use client";

import { useFormStore } from "@/lib/store";
import { FormField } from "@/types/field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, SeparatorHorizontalIcon, TrashIcon } from "lucide-react";
import { fieldRenderers } from "@/components/form-field";
import { CSSProperties, JSX } from "react";

interface SortableFieldProps {
  field: FormField;
  isGhostMode?: boolean;
}

/**
 * Sortable Field
 * - Renders a form field that can be sorted via drag-and-drop.
 * - Provides functionality for selecting, hovering, cloning, and removing fields.
 *
 * @param {SortableFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SortableField = ({
  field,
  isGhostMode = false,
}: SortableFieldProps): JSX.Element => {
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

  /**
   * Renders the field using the appropriate renderer based on its type.
   *
   * @param {FormField} field - The field to render.
   * @returns {JSX.Element | null} The rendered field or null if no renderer is found.
   */
  const renderField = (field: FormField): JSX.Element | null => {
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

  /**
   * Style for Draggable Element
   */
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
      className={`relative border transition ${
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
        <div className="absolute inset-0 bg-blue-200/30 dark:bg-white/30 pointer-events-none" />
      )}

      <div className="pointer-events-none">{renderField(field)}</div>

      {/*Form Field Action Items */}
      {!isGhostMode && (
        <div
          className={`transition ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {/* Drag Handle */}
          <div
            {...listeners}
            className="absolute inset-0 cursor-grab text-gray-500 dark:text-gray-100 hover:text-black dark:hover:text-white flex items-center justify-center"
            title="Rearrange Field"
          >
            <SeparatorHorizontalIcon size={24} />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1">
            {/* Clone Field Bitton */}
            {!isInvalid && (
              <div
                role="button"
                className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  cloneField(field.id);
                }}
                title="Duplicate Field"
              >
                <CopyIcon size={14} />
              </div>
            )}
            {/* Remove Field Button */}
            <div
              role="button"
              className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
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

export { SortableField };

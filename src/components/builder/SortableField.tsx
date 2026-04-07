"use client";

import { FormField } from "@/types/form.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, SeparatorHorizontalIcon, TrashIcon } from "lucide-react";
import { fieldRenderers } from "@/components/form-field";
import { Button } from "@/components/ui/Button";
import { CSSProperties, JSX } from "react";
import {
  useFieldValidationStore,
  useFormDataStore,
  useUIStateStore,
} from "@/lib/stores";
import { cn } from "@/lib/utils/styleUtils";

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
  const cloneField = useFormDataStore((state) => state.cloneField);
  const removeField = useFormDataStore((state) => state.removeField);
  const selectedFieldId = useUIStateStore((state) => state.selectedFieldId);
  const hoveredFieldId = useUIStateStore((state) => state.hoveredFieldId);
  const selectField = useUIStateStore((state) => state.selectField);
  const hoverField = useUIStateStore((state) => state.hoverField);
  const fieldErrors = useFieldValidationStore((state) => state.fieldErrors);
  const clearFieldErrors = useFieldValidationStore(
    (state) => state.clearFieldErrors,
  );

  const isSelected = selectedFieldId === field.id;
  const isHovered = hoveredFieldId === field.id;
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
      tabIndex={0}
      role="button"
      data-slot="field"
      data-id={field.id}
      className={cn(
        "relative border transition outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-200 border-transparent",
        {
          "border-destructive min-h-10 bg-destructive/5": isInvalid,
          "border-blue-500 dark:border-gray-300": isSelected && !isInvalid,
        },
      )}
      onMouseEnter={() => {
        if (!isDragging) {
          hoverField(field.id);
        }
      }}
      onMouseLeave={() => {
        if (!isDragging) {
          hoverField(null);
        }
      }}
      onClick={() => {
        if (!isDragging) {
          selectField(field.id);
        }
      }}
      onKeyDown={(e) => {
        listeners?.onKeyDown?.(e);

        if (!isDragging) {
          if (e.key === "Enter" || e.key === " ") {
            hoverField(field.id);
            selectField(field.id);
          } else if (e.key === "Tab") {
            hoverField(field.id);
          }
        }
      }}
    >
      {/* Form Field Overlay highlighted on mouse hover and 'Tab' keyboard navigation */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-200/30 dark:bg-white/30 transition-colors pointer-events-none" />
      )}

      {/* Form Field Content */}
      <div className="pointer-events-none">{renderField(field)}</div>

      {/*Form Field Action Items */}
      {!isGhostMode && (
        <div
          className={cn(
            "transition opacity-0 invisible",
            isHovered && "opacity-100 visible",
          )}
        >
          {/* Drag Handle */}
          <div
            {...listeners}
            aria-label="Reorder field"
            className="absolute inset-0 cursor-grab text-gray-500 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center"
            title="Reorder Field"
          >
            <SeparatorHorizontalIcon size={24} />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1 z-1">
            {/* Clone Field Button */}
            {!isInvalid && (
              <Button
                variant="ghost"
                tabIndex={-1}
                className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  cloneField(field.id);
                }}
                title="Duplicate Field"
              >
                <CopyIcon size={14} />
              </Button>
            )}
            {/* Remove Field Button */}
            <Button
              variant="ghost"
              tabIndex={-1}
              className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                removeField(field.id);
                clearFieldErrors(field.id);
              }}
              title="Delete Field"
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { SortableField };

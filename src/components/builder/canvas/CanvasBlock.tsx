"use client";

import { FormBlock } from "@/lib/types/form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, SeparatorHorizontalIcon, TrashIcon } from "lucide-react";
import { widgetBlockRenderers } from "@/components/form/blocks";
import { Button } from "@/components/ui/Button";
import { CSSProperties, JSX } from "react";
import {
  useFormBlockValidationStore,
  useFormDataStore,
  useUIStateStore,
} from "@/lib/stores";
import { cn } from "@/lib/utils/styleUtils";

interface CanvasBlockProps {
  block: FormBlock;
  isGhostMode?: boolean;
}

/**
 * Canvas Block (Sortable Block Wrapper)
 * - Renders a form block that can be sorted via drag-and-drop.
 * - Provides functionality for selecting, hovering, cloning, and removing blocks.
 *
 * @param {CanvasBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CanvasBlock = ({
  block,
  isGhostMode = false,
}: CanvasBlockProps): JSX.Element => {
  const cloneBlock = useFormDataStore((state) => state.cloneFormBlock);
  const removeBlock = useFormDataStore((state) => state.removeFormBlock);
  const selectedBlockId = useUIStateStore((state) => state.selectedFormBlockId);
  const hoveredBlockId = useUIStateStore((state) => state.hoveredFormBlockId);
  const selectBlock = useUIStateStore((state) => state.selectFormBlock);
  const hoverBlock = useUIStateStore((state) => state.hoverFormBlock);
  const blockErrors = useFormBlockValidationStore(
    (state) => state.formBlockErrors,
  );
  const clearBlockErrors = useFormBlockValidationStore(
    (state) => state.clearFormBlockErrors,
  );

  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id;
  const isInvalid = blockErrors[block.id]?.length > 0;

  /**
   * Renders the form block using the appropriate renderer based on its type.
   *
   * @param {FormBlock} formBlock - The form block to render.
   * @returns {JSX.Element | null} The rendered block or null if no renderer is found.
   */
  const renderFormBlock = (formBlock: FormBlock): JSX.Element | null => {
    const FormRenderer = widgetBlockRenderers[formBlock.type];
    return FormRenderer ? <FormRenderer block={formBlock} /> : null;
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      ...block,
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
      data-slot="block"
      data-id={block.id}
      className={cn(
        "relative border transition outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-200 border-transparent",
        {
          "border-destructive min-h-10 bg-destructive/5": isInvalid,
          "border-blue-500 dark:border-gray-300": isSelected && !isInvalid,
        },
      )}
      onMouseEnter={() => {
        if (!isDragging) {
          hoverBlock(block.id);
        }
      }}
      onMouseLeave={() => {
        if (!isDragging) {
          hoverBlock(null);
        }
      }}
      onClick={() => {
        if (!isDragging) {
          selectBlock(block.id);
        }
      }}
      onKeyDown={(e) => {
        listeners?.onKeyDown?.(e);

        if (!isDragging) {
          if (e.key === "Enter" || e.key === " ") {
            hoverBlock(block.id);
            selectBlock(block.id);
          } else if (e.key === "Tab") {
            hoverBlock(block.id);
          }
        }
      }}
    >
      {/* Form Block Overlay highlighted on mouse hover and 'Tab' keyboard navigation */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-200/30 dark:bg-white/30 transition-colors pointer-events-none" />
      )}

      {/* Form Block Content */}
      <div className="pointer-events-none">{renderFormBlock(block)}</div>

      {/*Form Block Action Items */}
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
            aria-label="Reorder block"
            className="absolute inset-0 cursor-grab text-gray-500 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center"
            title="Reorder Block"
          >
            <SeparatorHorizontalIcon size={24} />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1 z-1">
            {/* Clone Block Button */}
            {!isInvalid && (
              <Button
                variant="ghost"
                tabIndex={-1}
                className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  cloneBlock(block.id);
                }}
                title="Duplicate Block"
              >
                <CopyIcon size={14} />
              </Button>
            )}
            {/* Remove Block Button */}
            <Button
              variant="ghost"
              tabIndex={-1}
              className="cursor-pointer rounded-full p-1.5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                removeBlock(block.id);
                clearBlockErrors(block.id);
              }}
              title="Delete Block"
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { CanvasBlock };

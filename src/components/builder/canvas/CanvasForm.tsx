"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CanvasBlock } from "./CanvasBlock";
import { useDroppable } from "@dnd-kit/core";
import { JSX } from "react";
import { FormBlock } from "@/lib/types/form";
import { useFormConfigStore } from "@/lib/stores/formConfigStore";
import Text from "@/components/ui/Text";

interface CanvasFormProps {
  overId: string | null;
  activeDragItem: FormBlock | null;
  dragSource: "sidebar" | "canvas" | null;
}

/**
 * Drop Placeholder Content
 */
const DropPlaceholder = (): JSX.Element => (
  <div className="h-10 bg-blue-200/50 dark:bg-white/50 border border-dashed border-blue-500 dark:border-gray-300 transition-colors" />
);

/**
 * Drop Zero State Content
 */
const DropZeroState = (): JSX.Element => (
  <div className="h-full text-gray-500 dark:text-white transition-colors flex flex-col items-center justify-center">
    <Text variant="h3">Empty form</Text>
    <Text variant="p" className="text-sm">
      Please drop widgets to create form.
    </Text>
  </div>
);

/**
 * Canvas Form (Center Area)
 * - Provides a canvas for arranging form blocks.
 * - Supports drag-and-drop functionality for form blocks.
 *
 * @param {CanvasFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CanvasForm = ({
  overId,
  activeDragItem,
  dragSource,
}: CanvasFormProps): JSX.Element => {
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const isOverEnd = overId && !formConfig.blocks.some((f) => f.id === overId);

  return (
    <div className="form-content" ref={setNodeRef}>
      <SortableContext
        items={formConfig.blocks.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* Empty canvas state */}
        {formConfig.blocks.length === 0 && !overId ? (
          <DropZeroState />
        ) : (
          <>
            {/* Form canvas state with dropped and configured blocks */}
            {formConfig.blocks.map((block) => (
              <div className="relative" key={block.id}>
                {/* Drop placeholder in the middle of the list */}
                {overId === block.id &&
                  dragSource === "sidebar" &&
                  activeDragItem?.id !== block.id && <DropPlaceholder />}
                <CanvasBlock block={block} />
              </div>
            ))}
          </>
        )}

        {/* Drop placeholder at end of list */}
        {isOverEnd && dragSource === "sidebar" && <DropPlaceholder />}
      </SortableContext>
    </div>
  );
};

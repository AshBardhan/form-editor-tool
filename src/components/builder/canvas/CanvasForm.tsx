"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CanvasBlock } from "./CanvasBlock";
import { useDroppable } from "@dnd-kit/core";
import { JSX } from "react";
import { DeviceList, DeviceType } from "@/lib/constants/device";
import { FormBlock } from "@/lib/types/form";
import { useFormDataStore } from "@/lib/stores/formDataStore";

interface CanvasFormProps {
  overId: string | null;
  activeDragItem: FormBlock | null;
  dragSource: "sidebar" | "canvas" | null;
  currentDevice: DeviceType;
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
  <div className="h-full text-gray-500 border dark:text-white shadow dark:shadow-white/80 transition-colors border-dashed flex items-center justify-center text-sm">
    Drop widgets to create form
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
  currentDevice,
}: CanvasFormProps): JSX.Element => {
  const form = useFormDataStore((state) => state.form);
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const isOverEnd = overId && !form.blocks.some((f) => f.id === overId);
  const currentDeviceMeta = DeviceList.find(
    (device) => device.label === currentDevice,
  );

  return (
    <div className="flex justify-center" ref={setNodeRef}>
      <div
        className="min-h-[75vh] w-full flex-1 bg-white dark:bg-black shadow dark:shadow-white/80 transition-[colors,max-width]"
        style={{ maxWidth: currentDeviceMeta?.size }}
      >
        <SortableContext
          items={form.blocks.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {/* Empty canvas state */}
          {form.blocks.length === 0 && !overId ? (
            <DropZeroState />
          ) : (
            <>
              {/* Form canvas state with dropped and configured blocks */}
              {form.blocks.map((block) => (
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
    </div>
  );
};

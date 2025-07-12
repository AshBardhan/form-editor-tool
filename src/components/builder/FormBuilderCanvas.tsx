"use client";

import { useFormStore } from "@/lib/store";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { useDroppable } from "@dnd-kit/core";
import { JSX } from "react";
import { DeviceList, DeviceType } from "@/lib/constants/device";

interface FormBuilderCanvasProps {
  overId: string | null;
  activeFieldId: string | null;
  dragSource: "sidebar" | "canvas" | null;
  currentDevice: DeviceType;
}

/**
 * Drop Placeholder Content
 */
const DropPlaceholderContent = (): JSX.Element => (
  <div className="h-10 bg-blue-200/50 dark:bg-white/50 border border-dashed border-blue-500 dark:border-gray-300 transition-all" />
);

/**
 * Form Builder Canvas
 * - Provides a canvas for arranging form fields.
 * - Supports drag-and-drop functionality for form fields.
 *
 * @param {FormBuilderCanvasProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const FormBuilderCanvas = ({
  overId,
  activeFieldId,
  dragSource,
  currentDevice,
}: FormBuilderCanvasProps): JSX.Element => {
  const { form } = useFormStore();
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const isOverEnd = overId && !form.fields.some((f) => f.id === overId);
  const currentDeviceMeta = DeviceList.find(
    (device) => device.label === currentDevice,
  );

  return (
    <div className="flex justify-center" ref={setNodeRef}>
      <div
        className="min-h-[75vh] w-full flex-1 bg-white dark:bg-black transition-[colors,max-width]"
        style={{ maxWidth: currentDeviceMeta?.size }}
      >
        <SortableContext
          items={form.fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {/* Empty canvas state */}
          {form.fields.length === 0 && !overId ? (
            <div className="h-full text-gray-500 border dark:text-white border-dashed flex items-center justify-center text-sm">
              Drag components here
            </div>
          ) : (
            <>
              {/* Form canvas state with dropped and configured fields */}
              {form.fields.map((field) => (
                <div className="relative" key={field.id}>
                  {/* Drop placeholder in the middle of the list */}
                  {overId === field.id &&
                    dragSource === "sidebar" &&
                    activeFieldId !== field.id && <DropPlaceholderContent />}
                  <SortableField field={field} />
                </div>
              ))}
            </>
          )}

          {/* Drop placeholder at end of list */}
          {isOverEnd && dragSource === "sidebar" && <DropPlaceholderContent />}
        </SortableContext>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };

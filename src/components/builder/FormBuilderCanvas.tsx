"use client";

import { useFormStore } from "@/lib/store";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Device } from "@/lib/constants/device";

interface FormBuilderCanvasProps {
  overId: string | null;
  activeFieldId: string | null;
  dragSource: "sidebar" | "canvas" | null;
  device: Device | null;
}

const DropPlaceholderContent = () => (
  <div className="h-10 bg-blue-300 dark:bg-gray-50 opacity-30 border border-blue-500 dark:border-gray-300 transition-all" />
);

const FormBuilderCanvas = ({
  overId,
  activeFieldId,
  dragSource,
  device,
}: FormBuilderCanvasProps) => {
  const { form } = useFormStore();
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const isOverEnd = overId && !form.fields.some((f) => f.id === overId);

  return (
    <div className="flex justify-center h-full" ref={setNodeRef}>
      <div
        className="min-h-[200px] w-full  flex-1 bg-white dark:bg-black transition-[colors,max-width] p-4 overflow-auto"
        style={{ maxWidth: device?.size }}
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
            form.fields.map((field) => (
              <div className="relative" key={field.id}>
                {/* Only show custom placeholder when dragging from sidebar */}
                {overId === field.id &&
                  dragSource === "sidebar" &&
                  activeFieldId !== field.id && <DropPlaceholderContent />}
                <SortableField field={field} />
              </div>
            ))
          )}

          {/* Show custom placeholder at the end if needed */}
          {isOverEnd && dragSource === "sidebar" && <DropPlaceholderContent />}
        </SortableContext>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };

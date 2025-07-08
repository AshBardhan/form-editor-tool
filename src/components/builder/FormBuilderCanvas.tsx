"use client";

import { useFormStore } from "@/lib/store";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Device } from "@/lib/constants/device";

interface FormBuilderCanvasProps {
  overId: string | null;
  device: Device | null;
}

const FormBuilderCanvas = ({ overId, device }: FormBuilderCanvasProps) => {
  const { form } = useFormStore();
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div className="flex justify-center h-full" ref={setNodeRef}>
      <div
        className="min-h-[200px] w-full transition-[max-width] flex-1 bg-white p-4 overflow-auto"
        style={{ maxWidth: device?.size }}
      >
        <SortableContext
          items={form.fields.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          {form.fields.length === 0 && !overId ? (
            <div className="h-full text-gray-500 border border-dashed flex items-center justify-center text-sm">
              Drag components here
            </div>
          ) : (
            form.fields.map((field) => (
              <React.Fragment key={field.id}>
                {/* Drop placeholder before hovered item */}
                {overId === field.id && (
                  <div className="h-10 bg-blue-300 opacity-30 border border-blue-500 transition-all" />
                )}
                <SortableField field={field} />
              </React.Fragment>
            ))
          )}
          {/* Show placeholder at end if overId is "canvas" */}
          {overId === "canvas" && (
            <div className="h-10 bg-blue-300 opacity-30 border border-blue-500 transition-all" />
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };

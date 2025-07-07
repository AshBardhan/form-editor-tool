"use client";

import { Header } from "@/components/Header";
import { useFormStore } from "@/lib/store";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

const FormBuilderCanvas = ({ overId }: { overId: string | null }) => {
  const { fields } = useFormStore();
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div className="space-y-4" ref={setNodeRef}>
      <Header />
      <div className="min-h-[200px] shadow transition bg-white py-1 my-2">
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          {fields.length === 0 && !overId ? (
            <div className="h-10 text-gray-500 text-center border border-dashed">
              Drag components here
            </div>
          ) : (
            fields.map((field) => (
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

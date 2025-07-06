"use client";

import { Header } from "@/components/header";
import { useFormStore } from "@/lib/store";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableField } from "./sortable-field";
import { useDroppable } from "@dnd-kit/core";

const FormBuilderCanvas = ({ overId }: { overId: string | null }) => {
  const { fields } = useFormStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div className="space-y-4" ref={setNodeRef}>
      <Header />
      <div
        className={`min-h-[200px] p-4 border-2 border-dashed rounded transition bg-gray-50"`}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          {fields.length === 0 && !overId ? (
            <p className="text-gray-500 text-sm italic">Drag components here</p>
          ) : (
            fields.map((field) => (
              <>
                {/* ✅ Drop placeholder before hovered item */}
                {overId === field.id && (
                  <div className="h-4 bg-blue-300 opacity-30 rounded my-2 transition-all" />
                )}
                <SortableField
                  key={field.id}
                  field={field}
                />
              </>
            ))
          )}
          {/* ✅ Show placeholder at end if overId is "canvas" */}
          {overId === "canvas" && (
            <div className="h-4 bg-blue-300 opacity-30 rounded my-2" />
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };

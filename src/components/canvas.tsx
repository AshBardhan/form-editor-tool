"use client";

import { Header } from "@/components/header";
import { useFormStore } from "@/lib/store";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableField } from "./sortable-field";
import { useDroppable } from "@dnd-kit/core";

const FormBuilderCanvas = () => {
  const { fields, removeField } = useFormStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div className="space-y-4" ref={setNodeRef}>
      <Header />
      <div
        className={`min-h-[200px] p-4 border-2 border-dashed rounded transition ${
          isOver ? "bg-blue-50" : "bg-gray-50"
        }`}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          {fields.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Drag components here</p>
          ) : (
            fields.map((field, index) => (
              <SortableField
                key={field.id}
                field={field}
                onRemove={removeField}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };

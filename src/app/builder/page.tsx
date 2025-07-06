"use client";

import { FormBuilderCanvas } from "@/components/canvas";
import { Sidebar } from "@/components/sidebar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { nanoid } from "nanoid";

export default function Home() {
  const { fields, addField, moveField } = useFormStore();
function handleDrop(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) return;

  // Reorder existing fields
  const activeIndex = fields.findIndex(f => f.id === active.id);
  const overIndex = fields.findIndex(f => f.id === over.id);

  if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
    moveField(activeIndex, overIndex);
  }

  // If dragging from sidebar (new component), handle insertion
  const dragged = active?.data?.current;
  const overId = over.id;

  if (!dragged || !over) return;

  const isNew = activeIndex === -1;
  if (isNew && overId === "canvas") {
    addField({
      id: nanoid(),
      type: dragged.type,
      label: dragged.label,
      required: false,
    });
  }
}

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="flex h-screen">
        <aside className="w-64 border-r border-black/5">
          <Sidebar />
        </aside>  
        <main className="flex-1 overflow-auto">
          <FormBuilderCanvas  />
        </main>
      </div>
    </DndContext>
  );
}

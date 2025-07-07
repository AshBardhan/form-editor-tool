"use client";

import { FormBuilderCanvas } from "@/components/builder/FormBuilderCanvas";
import { ComponentSidebar } from "@/components/builder/ComponentSidebar";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { useState } from "react";
import { FieldEditorSidebar } from "@/components/builder/FieldEditorSidebar";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);
  const { fields, moveField, addField } = useFormStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const dragged = active.data?.current;
    if (!dragged) return;

    const activeId = active.id;
    const overId = over.id;

    const activeIndex = fields.findIndex((f) => f.id === activeId);
    const overIndex = fields.findIndex((f) => f.id === overId);

    const isReorder = activeIndex !== -1 && overIndex !== -1;
    const isInsertBetween = activeIndex === -1 && overIndex !== -1;
    const isInsertAtEnd = activeIndex === -1 && overId === "canvas";

    if (isReorder && activeIndex !== overIndex) {
      moveField(activeIndex, overIndex);
      return;
    }

    if (isInsertBetween) {
      addField(dragged.type, overIndex);
      return;
    }

    if (isInsertAtEnd) {
      addField(dragged.type);
    }
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragOver={(event) => setOverId((event.over?.id as string) ?? null)}
      onDragEnd={(event) => {
        handleDragEnd(event);
        setOverId(null);
      }}
    >
      <div className="flex h-screen">
        <aside className="w-72 bg-gray-400 border-r border-black/5">
          <ComponentSidebar />
        </aside>
        <main className="flex-1 px-16 bg-gray-100 overflow-auto">
          <FormBuilderCanvas overId={overId} />
        </main>
        <aside className="w-72 bg-gray-400 border-l border-black/5">
          <FieldEditorSidebar />
        </aside>
      </div>
    </DndContext>
  );
}

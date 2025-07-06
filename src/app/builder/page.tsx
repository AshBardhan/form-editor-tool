"use client";

import { FormBuilderCanvas } from "@/components/canvas";
import { Sidebar } from "@/components/sidebar";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FieldEditor } from "@/components/field-editor";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const dragged = active.data?.current;
    if (!dragged) return;

    const { fields, moveField, addField } = useFormStore.getState();

    const activeId = active.id;
    const overId = over.id;

    const activeIndex = fields.findIndex((f) => f.id === activeId);
    const overIndex = fields.findIndex((f) => f.id === overId);

    const isReorder = activeIndex !== -1 && overIndex !== -1;
    const isInsert = activeIndex === -1 && overIndex !== -1;

    // ✅ Reordering existing fields
    if (isReorder && activeIndex !== overIndex) {
      moveField(activeIndex, overIndex);
      return;
    }

    // ✅ Inserting new field between existing items
    if (isInsert) {
      const newField = {
        id: nanoid(),
        type: dragged.type,
        label: dragged.label,
        required: false,
      };

      const updatedFields = [...fields];
      updatedFields.splice(overIndex, 0, newField);

      useFormStore.setState({ fields: updatedFields });
      return;
    }

    // ✅ If dropped on canvas (empty), insert at end
    if (activeIndex === -1 && overId === "canvas") {
      addField({
        id: nanoid(),
        type: dragged.type,
        label: dragged.label,
        required: false,
      });
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
          <Sidebar />
        </aside>
        <main className="flex-1 px-8 bg-gray-100 overflow-auto">
          <FormBuilderCanvas overId={overId} />
        </main>
        <aside className="w-72 bg-gray-400 border-l border-black/5">
          <FieldEditor />
        </aside>
      </div>
    </DndContext>
  );
}

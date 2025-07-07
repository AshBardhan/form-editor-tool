"use client";

import { FormBuilderCanvas } from "@/components/FormBuilderCanvas";
import { Sidebar } from "@/components/Sidebar";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FieldEditor } from "@/components/FieldEditor";
import { getDefaultProps } from "@/lib/constants/defaultFieldProps";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);
  const { fields, moveField, insertFieldAt, addField } = useFormStore();

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
    const isInsert = activeIndex === -1 && overIndex !== -1;

    // Reordering existing fields
    if (isReorder && activeIndex !== overIndex) {
      moveField(activeIndex, overIndex);
      return;
    }

    // Inserting new field between existing items
    if (isInsert) {
      const newId = nanoid();
      const newField = {
        id: newId,
        type: dragged.type,
        name: `${dragged.type}-${newId}`,
        props: getDefaultProps(dragged.type),
      };

      insertFieldAt(newField, overIndex);
      return;
    }

    // If dropped on canvas (empty), insert at end
    if (activeIndex === -1 && overId === "canvas") {
      const newId = nanoid();
      addField({
        id: nanoid(),
        type: dragged.type,
        name: `${dragged.type}-${newId}`,
        props: getDefaultProps(dragged.type),
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

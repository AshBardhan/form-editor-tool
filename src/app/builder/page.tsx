"use client";

import { FormBuilderCanvas } from "@/components/builder/FormBuilderCanvas";
import { ComponentSidebar } from "@/components/builder/ComponentSidebar";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { useState } from "react";
import { FieldEditorSidebar } from "@/components/builder/FieldEditorSidebar";
import { Field, FieldType } from "@/types/field";
import { SortableField } from "@/components/builder/SortableField";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<Field | null>(null);
  const [dragSource, setDragSource] = useState<"sidebar" | "canvas" | null>(
    null,
  );
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

  function renderPreview(field: Field) {
    return (
      <div className="border border-dashed border-gray-400 bg-gray-100 text-sm text-gray-600 px-4 py-2 rounded">
        {field.name}
      </div>
    );
  }

  return (
    <>
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={(event) => {
          const data = event.active.data.current;
          if (!data) return;

          setActiveDragItem(data as Field);

          if (data.from === "sidebar") {
            setDragSource("sidebar");
          } else {
            setDragSource("canvas");
          }
        }}
        onDragOver={(event) => {
          setOverId((event.over?.id as string) ?? null);
        }}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setOverId(null);
          setActiveDragItem(null);
          setDragSource(null);
        }}
      >
        <DragOverlay>
          {activeDragItem ? (
            dragSource === "sidebar" ? (
              renderPreview(activeDragItem)
            ) : (
              <SortableField field={activeDragItem} />
            )
          ) : null}
        </DragOverlay>
        <div className="flex h-screen">
          <aside className="w-72 flex-shrink-0 bg-[#151515] text-white border-r border-[#373737]">
            <ComponentSidebar />
          </aside>
          <main className="flex-1 px-16 bg-gray-100 overflow-auto">
            <FormBuilderCanvas overId={overId} />
          </main>
          <aside className="w-72 flex-shrink-0 bg-[#151515] text-white border-l border-[#373737]">
            <FieldEditorSidebar />
          </aside>
        </div>
      </DndContext>
    </>
  );
}

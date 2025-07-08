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
import { FormEditorSidebar } from "@/components/builder/FormEditorSidebar";
import { FormField } from "@/types/field";
import { SortableField } from "@/components/builder/SortableField";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<FormField | null>(null);
  const [dragSource, setDragSource] = useState<"sidebar" | "canvas" | null>(
    null,
  );
  const { form, selectField, moveField, addField } = useFormStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const dragged = active.data?.current;
    if (!dragged) return;

    const activeId = active.id;
    const overId = over.id;

    const activeIndex = form.fields.findIndex((f) => f.id === activeId);
    const overIndex = form.fields.findIndex((f) => f.id === overId);

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

  function renderPreview(field: FormField) {
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

          setActiveDragItem(data as FormField);

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
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-72 flex-shrink-0 bg-[#151515] text-[#fefefe] border-r border-[#373737]">
            <ComponentSidebar />
          </aside>
          <main
            className="flex-1 px-16 py-8 bg-gray-100 overflow-hidden"
            onClickCapture={(e) => {
              // Only reset if the click is outside any field
              const target = e.target as HTMLElement;
              if (!target.closest("[data-slot='field']")) {
                selectField(null);
              }
            }}
          >
            <FormBuilderCanvas overId={overId} />
          </main>
          <aside className="w-72 flex-shrink-0 bg-[#151515] text-[#fefefe] border-l border-[#373737]">
            <FormEditorSidebar />
          </aside>
        </div>
      </DndContext>
    </>
  );
}

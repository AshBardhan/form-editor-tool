"use client";

import { FormBuilderCanvas } from "@/components/builder/FormBuilderCanvas";
import { FormComponentSidebar } from "@/components/builder/FormComponentSidebar";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { useState } from "react";
import { FormConfigurationSidebar } from "@/components/builder/FormConfigurationSidebar";
import { FormField } from "@/types/field";
import { SortableField } from "@/components/builder/SortableField";
import { Button } from "@/components/ui/Button";
import { DeviceList, DeviceType } from "@/lib/constants/device";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";

export default function Home() {
  const [overId, setOverId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<FormField | null>(null);
  const [dragSource, setDragSource] = useState<"sidebar" | "canvas" | null>(
    null,
  );
  const { form, isSidebarCollapsed, selectField, moveField, addField } =
    useFormStore();
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);
  const selectedDevice = DeviceList.find((d) => d.label === deviceType) || null;
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;

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
            selectField(data.id);
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
              <SortableField isGhostMode={true} field={activeDragItem} />
            )
          ) : null}
        </DragOverlay>

        {!isLeftCollapsed && (
          <Sidebar>
            <FormComponentSidebar />
          </Sidebar>
        )}
        <MainContent>
          <div
            className="py-12 px-8 h-full overflow-y-auto"
            onClickCapture={(e) => {
              const target = e.target as HTMLElement;
              if (!target.closest("[data-slot='field']")) {
                selectField(null);
              }
            }}
          >
            <div className="absolute z-[1] top-1 left-1/2 -translate-x-1/2 bg-[#151515] rounded overflow-hidden text-white flex">
              {DeviceList.map((device) => {
                const Icon = device.icon;
                return (
                  <Button
                    variant="ghost"
                    title={device.label}
                    key={device.label}
                    onClick={() => setDeviceType(device.label)}
                    className={`${deviceType === device.label && "bg-[#2e2e2e]"} hover:bg-[#1f1f1f] rounded-none`}
                  >
                    <Icon size={12} />
                  </Button>
                );
              })}
            </div>

            <FormBuilderCanvas
              device={selectedDevice}
              overId={overId}
              activeFieldId={activeDragItem?.id || null}
              dragSource={dragSource}
            />
          </div>
        </MainContent>
        {!isRightCollapsed && (
          <Sidebar position="right">
            <FormConfigurationSidebar />
          </Sidebar>
        )}
      </DndContext>
    </>
  );
}

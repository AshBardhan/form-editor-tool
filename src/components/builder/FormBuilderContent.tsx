"use client";

import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { JSX, useState } from "react";
import { hybridKeyboardCoordinates } from "@/lib/utils/keyboardUtils";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { AnimatePresence } from "motion/react";
import { Widget } from "@/lib/types/widget";
import { FormBlock } from "@/lib/types/form";
import { DeviceType, DeviceList } from "@/lib/constants/device";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";
import { DeviceSelector } from "@/components/layout/DeviceSelector";
import { CanvasDroppable } from "@/components/builder/canvas/CanvasDroppable";
import { CanvasForm } from "@/components/builder/canvas/CanvasForm";
import { WidgetPanel } from "@/components/builder/widgets/WidgetPanel";
import { ConfigurationPanel } from "@/components/builder/configuration/ConfigurationPanel";

interface DragState {
  overId: string | null;
  activeItem: FormBlock | Widget | null;
  source: "sidebar" | "canvas" | null;
}

/**
 * Form Builder Content
 * - Renders form with prefilled and empty data
 * - Provides drag-and-drop and configuration for form
 *
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContent = (): JSX.Element => {
  const [dragState, setDragState] = useState<DragState>({
    overId: null,
    activeItem: null,
    source: null,
  });
  const formBlocks = useFormConfigStore((state) => state.formConfig.blocks);
  const moveFormBlock = useFormConfigStore((state) => state.moveFormBlock);
  const addFormBlock = useFormConfigStore((state) => state.addFormBlock);
  const selectFormBlock = useUIStateStore((state) => state.selectFormBlock);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);

  /**
   * Handles the end of a drag event.
   * Determines the appropriate action based on the drag source and target.
   *
   * @param {DragEndEvent} event - The drag end event.
   */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const dragged = active.data?.current;
    if (!dragged) return;

    const activeIndex = formBlocks.findIndex((f) => f.id === active.id);
    const overIndex = formBlocks.findIndex((f) => f.id === over.id);
    const isExistingFormBlock = activeIndex !== -1;

    // Handle reordering existing blocks
    if (isExistingFormBlock && overIndex !== -1 && activeIndex !== overIndex) {
      moveFormBlock(activeIndex, overIndex);
      return;
    }

    // Handle adding new blocks (from sidebar)
    if (!isExistingFormBlock) {
      const insertIndex = over.id === "canvas" ? undefined : overIndex;
      const newId = addFormBlock(dragged.type, insertIndex);
      selectFormBlock(newId);
    }
  }

  /**
   * Sets up sensor configurations for mouse and keyboard interactions.
   */
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: hybridKeyboardCoordinates,
    }),
  );

  return (
    <>
      {/* Drag Context Container */}
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={(event: DragStartEvent) => {
          const data = event.active.data.current;
          if (!data) return;

          if (data.from === "sidebar") {
            selectFormBlock(null);
          } else {
            selectFormBlock(data.id);
          }
          setDragState({
            ...dragState,
            activeItem: data as FormBlock | Widget,
            source: data.from,
          });
        }}
        onDragOver={(event: DragOverEvent) => {
          const overId = (event.over?.id as string) ?? null;
          setDragState({ ...dragState, overId });
        }}
        onDragEnd={(event: DragEndEvent) => {
          handleDragEnd(event);
          setDragState({
            overId: null,
            activeItem: null,
            source: null,
          });
        }}
      >
        {/* Drag Placeholder Overlay */}
        <DragOverlay>
          {dragState.activeItem && (
            <CanvasDroppable
              item={dragState.activeItem}
              source={dragState.source}
            />
          )}
        </DragOverlay>

        {/* Left Form Component Sidebar */}
        <AnimatePresence>
          {!isSidebarCollapsed.left && (
            <Sidebar>
              <WidgetPanel />
            </Sidebar>
          )}
        </AnimatePresence>

        {/* Main Content Area with Canvas and Device Selector */}
        <MainContent>
          <DeviceSelector
            currentDevice={deviceType}
            onDeviceChange={setDeviceType}
          />
          <div
            className="form-container"
            style={{
              maxWidth: `${DeviceList.find((d) => d.label === deviceType)?.size || 1440}px`,
            }}
            onClickCapture={(e) => {
              const target = e.target as HTMLElement;
              if (!target.closest("[data-slot='block']")) {
                selectFormBlock(null);
              }
            }}
          >
            <CanvasForm
              overId={dragState.overId}
              activeDragItem={dragState.activeItem as FormBlock}
              dragSource={dragState.source}
            />
          </div>
        </MainContent>

        {/* Right Form Configuration Sidebar */}
        <AnimatePresence>
          {!isSidebarCollapsed.right && (
            <Sidebar position="right">
              <ConfigurationPanel />
            </Sidebar>
          )}
        </AnimatePresence>
      </DndContext>
    </>
  );
};

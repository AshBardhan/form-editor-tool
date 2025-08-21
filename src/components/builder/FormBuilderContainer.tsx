"use client";

import { FormBuilderCanvas } from "./FormBuilderCanvas";
import { FormComponentSidebar } from "./FormComponentSidebar";
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
import { JSX, useEffect, useState } from "react";
import { FormConfigurationSidebar } from "./FormConfigurationSidebar";
import { Component } from "@/types/component";
import { FormField, FormData } from "@/types/form-field";
import { DeviceType } from "@/lib/constants/device";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";
import { DeviceSelector } from "./DeviceSelector";
import { DroppableItemPreview } from "./DroppableItemPreview";
import { hybridKeyboardCoordinates } from "@/lib/utils/keyboardUtils";
import { useFormDataStore, useUIStateStore } from "@/lib/stores";
import { AnimatePresence } from "motion/react";
import { LoaderCircleIcon } from "lucide-react";
import { switchTheme } from "@/lib/utils/domUtils";

interface DragState {
  overId: string | null;
  activeItem: FormField | Component | null;
  source: "sidebar" | "canvas" | null;
}

interface FormBuilderContainerProps {
  id?: string;
}

/**
 * Form Builder Container
 * - Provides drag-and-drop and configuration for form fields
 * - Device selection for different screen sizes
 *
 * @param {FormBuilderContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const FormBuilderContainer = ({
  id,
}: FormBuilderContainerProps): JSX.Element => {
  const [dragState, setDragState] = useState<DragState>({
    overId: null,
    activeItem: null,
    source: null,
  });
  const form = useFormDataStore((state) => state.form);
  const setForm = useFormDataStore((state) => state.setForm);
  const resetForm = useFormDataStore((state) => state.resetForm);
  const moveField = useFormDataStore((state) => state.moveField);
  const addField = useFormDataStore((state) => state.addField);
  const loading = useUIStateStore((state) => state.loading);
  const setLoading = useUIStateStore((state) => state.setLoading);
  const selectField = useUIStateStore((state) => state.selectField);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);
  const [error, setError] = useState<string | null>(null);

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

    const activeIndex = form.fields.findIndex((f) => f.id === active.id);
    const overIndex = form.fields.findIndex((f) => f.id === over.id);
    const isExistingField = activeIndex !== -1;

    // Handle reordering existing fields
    if (isExistingField && overIndex !== -1 && activeIndex !== overIndex) {
      moveField(activeIndex, overIndex);
      return;
    }

    // Handle adding new fields (from sidebar)
    if (!isExistingField) {
      const insertIndex = over.id === "canvas" ? undefined : overIndex;
      const newId = addField(dragged.type, insertIndex);
      selectField(newId);
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

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/form/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load form`);
        }
        const form: FormData = await response.json();
        setForm(form);
        switchTheme(form.theme);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      resetForm();
      setLoading(false);
      setError(null);
      switchTheme("");
    };
  }, [id]);

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center gap-4">
        <LoaderCircleIcon className="size-10 animate-spin" />
        <span className="text-2xl">Loading Form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content flex items-center justify-center text-red-600 flex-col gap-3">
        <p className="text-lg font-semibold">{error}</p>
        <p className="text-sm text-gray-500">
          Please check the form ID or go back.
        </p>
      </div>
    );
  }

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
            selectField(null);
          } else {
            selectField(data.id);
          }
          setDragState({
            ...dragState,
            activeItem: data as FormField | Component,
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
            <DroppableItemPreview
              item={dragState.activeItem}
              source={dragState.source}
            />
          )}
        </DragOverlay>

        {/* Left Form Component Sidebar */}
        <AnimatePresence>
          {!isSidebarCollapsed.left && (
            <Sidebar>
              <FormComponentSidebar />
            </Sidebar>
          )}
        </AnimatePresence>

        {/* Main Content Area with Canvas and Device Selector */}
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
            <DeviceSelector
              currentDevice={deviceType}
              onDeviceChange={setDeviceType}
            />

            <FormBuilderCanvas
              currentDevice={deviceType}
              overId={dragState.overId}
              activeDragItem={dragState.activeItem as FormField}
              dragSource={dragState.source}
            />
          </div>
        </MainContent>

        {/* Right Form/Field Configuration Sidebar */}
        <AnimatePresence>
          {!isSidebarCollapsed.right && (
            <Sidebar position="right">
              <FormConfigurationSidebar />
            </Sidebar>
          )}
        </AnimatePresence>
      </DndContext>
    </>
  );
};

export { FormBuilderContainer };

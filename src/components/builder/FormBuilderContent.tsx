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
import { JSX, useState, useEffect, useMemo, useCallback } from "react";
import { hybridKeyboardCoordinates } from "@/lib/utils/keyboardUtils";
import { switchFormTheme } from "@/lib/utils/domUtils";
import {
  useFormConfigStore,
  useUIStateStore,
  useFormBlockValidationStore,
} from "@/lib/stores";
import { AnimatePresence } from "motion/react";
import { Widget } from "@/lib/types/widget";
import { FormBlock, FormConfig } from "@/lib/types/form";
import { Sidebar, MainContent, PageContainer } from "@/components/layout";
import { CanvasDroppable } from "@/components/builder/canvas/CanvasDroppable";
import { CanvasForm } from "@/components/builder/canvas/CanvasForm";
import { WidgetPanel } from "@/components/builder/widgets/WidgetPanel";
import { ConfigurationPanel } from "@/components/builder/configuration/ConfigurationPanel";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";

interface DragState {
  overId: string | null;
  activeItem: FormBlock | Widget | null;
  source: "sidebar" | "canvas" | null;
}

/**
 * Form Builder Content
 * - Renders form with prefilled and empty data
 * - Provides drag-and-drop and configuration for form
 * - Manages form editability based on status and submissions
 * - Auto-saves changes with debouncing and toast notifications
 *
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderContent = (): JSX.Element => {
  const [dragState, setDragState] = useState<DragState>({
    overId: null,
    activeItem: null,
    source: null,
  });
  const form = useFormConfigStore((state) => state.formConfig);
  const moveFormBlock = useFormConfigStore((state) => state.moveFormBlock);
  const addFormBlock = useFormConfigStore((state) => state.addFormBlock);
  const removeFormBlock = useFormConfigStore((state) => state.removeFormBlock);
  const selectFormBlock = useUIStateStore((state) => state.selectFormBlock);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const clearFormBlockErrors = useFormBlockValidationStore(
    (state) => state.clearFormBlockErrors,
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    blockId: string | null;
  }>({ isOpen: false, blockId: null });

  // Determine if form is editable based on status and submission count
  const isFormEditable = useMemo(() => {
    switch (form.status) {
      case "archived":
        return false;
      case "published":
        return (form.submissionCount ?? 0) === 0;
      default:
        return true;
    }
  }, [form.status, form.submissionCount]);

  // Auto-save callback: handles API call and toast notifications
  const handleSave = useCallback(async (data: FormConfig) => {
    const toastId = toast.info("Saving changes...", {
      duration: Infinity,
      dismissible: false,
    });

    try {
      const response = await fetch(`/api/forms/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message ?? "Failed to save form.");
      }

      toast.update(toastId, {
        type: "success",
        title: "Changes saved",
        duration: 2000,
        dismissible: true,
      });
    } catch (err) {
      toast.update(toastId, {
        type: "error",
        title: "Failed to save",
        description: err instanceof Error ? err.message : "Unknown error",
        duration: 5000,
        dismissible: true,
      });
    }
  }, []);

  // Auto-save hook: only saves user-editable fields
  useAutoSave({
    data: form,
    onSave: handleSave,
    enabled: isFormEditable && !!form.id,
    debounceMs: 1000,
    isEqual: (a, b) =>
      a.title === b.title &&
      a.description === b.description &&
      a.theme === b.theme &&
      JSON.stringify(a.blocks) === JSON.stringify(b.blocks),
  });

  /**
   * Opens delete confirmation modal for a specific block.
   */
  const handleDeleteRequest = (blockId: string) => {
    setDeleteConfirmation({ isOpen: true, blockId });
  };

  /**
   * Handles the confirmation of block deletion.
   */
  const handleConfirmDelete = () => {
    if (deleteConfirmation.blockId) {
      removeFormBlock(deleteConfirmation.blockId);
      clearFormBlockErrors(deleteConfirmation.blockId);
      setDeleteConfirmation({ isOpen: false, blockId: null });
    }
  };

  /**
   * Closes the delete confirmation modal.
   */
  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, blockId: null });
  };

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

    const activeIndex = form.blocks.findIndex((f) => f.id === active.id);
    const overIndex = form.blocks.findIndex((f) => f.id === over.id);
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

  // Apply theme to form container
  useEffect(() => {
    switchFormTheme(form.theme);
    return () => switchFormTheme("");
  }, [form.theme]);

  return (
    <div className="flex h-full relative">
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
            <div className={form.theme}>
              <CanvasDroppable
                item={dragState.activeItem}
                source={dragState.source}
              />
            </div>
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

        {/* Main Content Area with Canvas and Save/Cancel Action Buttons */}
        <MainContent className="flex flex-col">
          <div className="flex-1 py-10 overflow-y-auto">
            <PageContainer
              className="px-6 min-w-md"
              onClickCapture={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest("[data-slot='block']")) {
                  selectFormBlock(null);
                }
              }}
            >
              <div className="form-container">
                <CanvasForm
                  overId={dragState.overId}
                  activeDragItem={dragState.activeItem as FormBlock}
                  dragSource={dragState.source}
                  onDeleteBlock={handleDeleteRequest}
                />
              </div>
            </PageContainer>
          </div>
        </MainContent>

        {/* Right Form Configuration Sidebar */}
        <AnimatePresence>
          {!isSidebarCollapsed.right && (
            <Sidebar position="right">
              <ConfigurationPanel onDeleteBlock={handleDeleteRequest} />
            </Sidebar>
          )}
        </AnimatePresence>
      </DndContext>

      {/* Uneditable Form Overlay */}
      {!isFormEditable && (
        <div className="absolute inset-0 bg-white/20 z-30 cursor-not-allowed flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Form Uneditable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {form.status === "archived"
                ? "This form is archived and cannot be edited. Restore it to 'published' status to make changes."
                : "This form has submissions and cannot be edited. Archive it first if you need to make changes."}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmation.isOpen}
        onOpenChange={(open) => !open && handleCancelDelete()}
      >
        <ModalContent size="sm">
          <ModalHeader className="pb-2">
            <div className="flex gap-3">
              <AlertTriangle className="shrink-0 h-6 w-6 text-red-600 dark:text-red-500" />
              <div className="flex-1 flex flex-col gap-2">
                <ModalTitle>Delete Block</ModalTitle>
                <ModalDescription>
                  Are you sure you want to delete this block? This action cannot
                  be undone.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

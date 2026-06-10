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
import { JSX, useState, useEffect } from "react";
import { hybridKeyboardCoordinates } from "@/lib/utils/keyboardUtils";
import { switchFormTheme } from "@/lib/utils/domUtils";
import {
  useFormConfigStore,
  useUIStateStore,
  useFormBlockValidationStore,
} from "@/lib/stores";
import { AnimatePresence } from "motion/react";
import { Widget } from "@/lib/types/widget";
import { FormBlock } from "@/lib/types/form";
import { DeviceType, DeviceList } from "@/lib/constants/device";
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
interface FormBuilderContentProps {
  isPersisting?: boolean;
  persistMessage?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

export const FormBuilderContent = ({
  isPersisting = false,
  persistMessage = "",
  onSave = () => {},
  onCancel = () => {},
}: FormBuilderContentProps): JSX.Element => {
  const [dragState, setDragState] = useState<DragState>({
    overId: null,
    activeItem: null,
    source: null,
  });
  const formBlocks = useFormConfigStore((state) => state.formConfig.blocks);
  const formTheme = useFormConfigStore((state) => state.formConfig.theme);
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

  // Apply theme to form container
  useEffect(() => {
    switchFormTheme(formTheme);
    return () => switchFormTheme("");
  }, [formTheme]);

  return (
    <>
      {isPersisting && (
        <div className="absolute inset-0 z-40 bg-black/30 backdrop-blur-[1px] flex items-center justify-center pt-4">
          <div className="text-white text-3xl font-medium">
            {persistMessage}
          </div>
        </div>
      )}

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
            <div className={formTheme === "dark" ? "dark" : ""}>
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

        {/* Main Content Area with Canvas and Save/Cancel CTA Buttons */}
        <MainContent className="flex flex-col">
          <div className="flex-1 py-10 overflow-y-auto">
            <PageContainer
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
          <div className="shrink-0 py-4 bg-white border-t flex items-center justify-center gap-4">
            <Button variant="positive" onClick={onSave} disabled={isPersisting}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isPersisting}
            >
              Cancel
            </Button>
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
    </>
  );
};

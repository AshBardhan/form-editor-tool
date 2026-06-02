"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, PanelLeft, PanelRight } from "lucide-react";
import { JSX, useState, useEffect } from "react";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { cn } from "@/lib/utils/styleUtils";
import { switchFormTheme } from "@/lib/utils/domUtils";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical, ChevronLeftIcon } from "lucide-react";

import { FormPreviewContent } from "@/components/preview";
import { DeviceSelector } from "@/components/layout/DeviceSelector";
import { DeviceType } from "@/lib/constants/device";

/**
 * Form Builder Header
 * - Controls the toggling of left/right sidebars
 * - Render buttons for previewing and publishing the form.
 *
 * @returns {JSX.Element} The rendered component.
 */
interface FormBuilderHeaderProps {
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}

export const FormBuilderHeader = ({
  onSave,
  onCancel,
  onDelete,
  isSubmitting,
}: FormBuilderHeaderProps): JSX.Element => {
  const formTitle = useFormConfigStore((state) => state.formConfig.title);
  const formTheme = useFormConfigStore((state) => state.formConfig.theme);
  const canDelete = useFormConfigStore((state) => !!state.formConfig.id);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const toggleSidebar = useUIStateStore((state) => state.toggleSidebar);
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(
    DeviceType.DESKTOP,
  );

  // Apply theme when preview modal is open
  useEffect(() => {
    if (isPreviewOpen) {
      switchFormTheme(formTheme);
    }
  }, [isPreviewOpen, formTheme]);

  return (
    <>
      <div className="flex items-center h-full">
        {/* Toggle collapse/expand Sidebar Control */}
        <div className="shrink-0 flex items-center gap-2">
          <Button
            variant="ghost"
            className="hover:bg-[#1f1f1f]"
            onClick={onCancel}
            title="Back to Dashboard"
          >
            <ChevronLeftIcon size={20} />
          </Button>
          <Button
            variant="ghost"
            title={`${isLeftCollapsed ? "Expand" : "Collapse"} Left Sidebar`}
            onClick={() => toggleSidebar("left")}
            className={cn(
              !isLeftCollapsed && "bg-[#2e2e2e]",
              "hover:bg-[#1f1f1f]",
            )}
          >
            <PanelLeft size={20} />
          </Button>
          <Button
            variant="ghost"
            title={`${isRightCollapsed ? "Expand" : "Collapse"} Right Sidebar`}
            onClick={() => toggleSidebar("right")}
            className={cn(
              !isRightCollapsed && "bg-[#2e2e2e]",
              "hover:bg-[#1f1f1f]",
            )}
          >
            <PanelRight size={20} />
          </Button>
        </div>
        {/* Form Title */}
        <div className="flex-1 px-8 flex items-center justify-between">
          <div className="font-semibold text-xl">{formTitle}</div>
          <div className="flex gap-4">
            <Button variant="positive" onClick={onSave} disabled={isSubmitting}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="shrink-0 flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-[#1f1f1f]"
                disabled={isSubmitting}
              >
                <MoreVertical size={20} />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark">
              <DropdownMenuItem onSelect={() => setIsPreviewOpen(true)}>
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>Publish</DropdownMenuItem>
              {canDelete && (
                <DropdownMenuItem
                  onSelect={() => setIsDeleteConfirmOpen(true)}
                  className="text-red-600 dark:text-red-400"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Form Preview Modal */}
      <Modal open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <ModalContent size="lg">
          <ModalHeader className="flex flex-row justify-center items-center gap-4 pb-6">
            <ModalTitle>Form Preview</ModalTitle>
            <DeviceSelector
              currentDevice={currentDevice}
              onDeviceChange={setCurrentDevice}
            />
          </ModalHeader>
          <div className="bg-gray-200 px-6 py-4 h-[70vh] overflow-y-auto">
            <FormPreviewContent editable={true} currentDevice={currentDevice} />
          </div>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <ModalContent size="sm">
          <ModalHeader className="pb-2">
            <div className="flex gap-3">
              <AlertTriangle className="shrink-0 h-6 w-6 text-red-600 dark:text-red-500" />
              <div className="flex-1 flex flex-col gap-2">
                <ModalTitle>Delete this form permanently?</ModalTitle>
                <ModalDescription>
                  This will permanently remove the form and all associated
                  submission reports. This action cannot be undone.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
              disabled={isSubmitting}
            >
              Keep form
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                onDelete();
              }}
              disabled={isSubmitting}
            >
              Delete permanently
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

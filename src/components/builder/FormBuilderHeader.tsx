"use client";

import { Button } from "@/components/ui/Button";
import { PanelLeft, PanelRight } from "lucide-react";
import { JSX, useState, useEffect } from "react";
import { useFormConfigStore, useUIStateStore } from "@/lib/stores";
import { cn } from "@/lib/utils/styleUtils";
import { switchFormTheme } from "@/lib/utils/domUtils";
import {
  Modal,
  ModalContent,
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
  isSubmitting: boolean;
}

export const FormBuilderHeader = ({
  onSave,
  onCancel,
  isSubmitting,
}: FormBuilderHeaderProps): JSX.Element => {
  const formTitle = useFormConfigStore((state) => state.formConfig.title);
  const formTheme = useFormConfigStore((state) => state.formConfig.theme);
  const formConfig = useFormConfigStore((state) => state.formConfig);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const toggleSidebar = useUIStateStore((state) => state.toggleSidebar);
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
            <FormPreviewContent
              form={formConfig}
              editable={true}
              currentDevice={currentDevice}
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

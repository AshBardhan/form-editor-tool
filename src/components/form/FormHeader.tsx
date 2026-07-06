"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";
import { FormConfig, FormStatus } from "@/lib/types/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/Modal";
import { DeviceSelector } from "@/components/layout/DeviceSelector";
import { FormPreviewContent } from "@/components/preview";
import { DeviceType } from "@/lib/constants/device";
import {
  AlertTriangle,
  Archive,
  BrushCleaning,
  ExternalLink,
  Eye,
  FileUp,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Text from "@/components/ui/Text";
import { formStatusLabel, formStatusVariant } from "@/lib/constants/form";

interface FormHeaderProps {
  form: { id: string; slug: string; title: string; status: FormStatus };
}

export function FormHeader({ form }: FormHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isBuilderPage = pathname?.endsWith("/builder");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isClearReportConfirmOpen, setIsClearReportConfirmOpen] =
    useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(
    DeviceType.DESKTOP,
  );

  const statusVariant = formStatusVariant[form.status] ?? "neutral";
  const statusLabel = formStatusLabel[form.status];

  const formNavigationPaths = [
    {
      label: "Builder",
      path: "builder",
    },
    {
      label: "Reports",
      path: "reports",
      children: [
        {
          label: "Submissions",
          path: "submissions",
        },
        {
          label: "Fields",
          path: "fields",
        },
      ],
    },
  ];

  const handleOpenPreview = () => {
    setCurrentDevice(DeviceType.DESKTOP);
    setIsPreviewOpen(true);
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${form.id}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as ApiResponse<{
        id: string;
        title: string;
        status: FormStatus;
        deletedSubmissions: number;
      }>;
      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Unable to delete form right now.",
        );
      }

      const deletedCount = result.data?.deletedSubmissions || 0;
      toast.success("Form permanently deleted", {
        description:
          deletedCount > 0
            ? `Deleted form and ${deletedCount} submission${deletedCount > 1 ? "s" : ""}.`
            : "The form has been removed.",
      });
      router.push("/forms");
      router.refresh();
    } catch (error) {
      toast.error("Delete failed", {
        description:
          error instanceof Error
            ? error.message
            : "We could not delete the form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearReport = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${form.id}/submissions`, {
        method: "DELETE",
      });

      const result = (await response.json()) as ApiResponse<{
        deletedSubmissions: number;
      }>;
      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Unable to clear report right now.",
        );
      }

      const deletedCount = result.data?.deletedSubmissions || 0;
      toast.success("Report cleared successfully", {
        description: `Deleted ${deletedCount} submission${deletedCount !== 1 ? "s" : ""} and all field responses.`,
      });
      router.refresh();
    } catch (error) {
      toast.error("Clear report failed", {
        description:
          error instanceof Error
            ? error.message
            : "We could not clear the report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFormStatus = async (newStatus: FormStatus) => {
    if (form.status === newStatus) {
      toast.info("Form status is already set to " + newStatus);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${form.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;
      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Unable to update status.");
      }

      const statusMessages: Record<FormStatus, string> = {
        published: "Form published",
        draft: "Form moved to draft",
        archived: "Form archived",
      };

      toast.success(statusMessages[newStatus] || "Status updated");
      router.refresh();
    } catch (error) {
      toast.error("Status update failed", {
        description:
          error instanceof Error
            ? error.message
            : "We could not update status. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccess = () => {
    window.open(`/f/${form.slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Text variant="h1">{form.title}</Text>
          <Badge label={statusLabel} variant={statusVariant} size="sm" />
        </div>

        <div className="flex items-center gap-4">
          {isBuilderPage && (
            <Button
              variant="secondary"
              onClick={handleOpenPreview}
              disabled={isSubmitting}
            >
              <Eye className="size-4" />
              Preview
            </Button>
          )}
          <Button
            onClick={handleAccess}
            disabled={isSubmitting || form.status !== "published"}
            title={
              form.status === "published"
                ? "Open public form"
                : "Publish form to enable public access"
            }
          >
            <ExternalLink className="size-4" />
            Access
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={isSubmitting}>
                <MoreVertical className="size-4" />
                <span className="sr-only">Open form actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Publish option: shown in draft and archived forms */}
              {(form.status === "draft" || form.status === "archived") && (
                <DropdownMenuItem
                  onSelect={() => handleUpdateFormStatus("published")}
                >
                  <FileUp className="size-4 mr-2" />
                  Publish
                </DropdownMenuItem>
              )}

              {/* Archive option: shown in draft and published forms */}
              {(form.status === "draft" || form.status === "published") && (
                <DropdownMenuItem
                  onSelect={() => handleUpdateFormStatus("archived")}
                >
                  <Archive className="size-4 mr-2" />
                  Archive
                </DropdownMenuItem>
              )}

              {/* Clear Report option: shown in published and archived forms */}
              {(form.status === "published" || form.status === "archived") && (
                <DropdownMenuItem
                  onSelect={() => setIsClearReportConfirmOpen(true)}
                >
                  <BrushCleaning className="size-4 mr-2" />
                  Clear Report
                </DropdownMenuItem>
              )}

              {/* Delete option: always shown */}
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onSelect={() => setIsDeleteConfirmOpen(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <NavigationTabs
        items={formNavigationPaths}
        basePath={`/forms/${form.slug}`}
      />

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

      <Modal open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <ModalContent size="sm">
          <ModalHeader className="pb-2">
            <div className="flex gap-3">
              <AlertTriangle className="shrink-0 h-6 w-6 text-red-600 dark:text-red-500" />
              <div className="flex-1 flex flex-col gap-2">
                <ModalTitle>Delete this form permanently?</ModalTitle>
                <ModalDescription>
                  This action cannot be undone. All submissions, field
                  responses and analytics data will be permanently removed.
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
                handleDelete();
              }}
              disabled={isSubmitting}
            >
              Delete permanently
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        open={isClearReportConfirmOpen}
        onOpenChange={setIsClearReportConfirmOpen}
      >
        <ModalContent size="sm">
          <ModalHeader className="pb-2">
            <div className="flex gap-3">
              <AlertTriangle className="shrink-0 h-6 w-6 text-amber-600 dark:text-amber-500" />
              <div className="flex-1 flex flex-col gap-2">
                <ModalTitle>Clear all submission data?</ModalTitle>
                <ModalDescription>
                  This will permanently delete all submissions and field
                  responses for this form. The form structure will remain
                  unchanged.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsClearReportConfirmOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsClearReportConfirmOpen(false);
                handleClearReport();
              }}
              disabled={isSubmitting}
            >
              Clear report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppBadge } from "@/design-system/app/AppBadge";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { toast } from "@/design-system/app/AppToast";
import { ApiResponse } from "@/lib/types/api";
import { FormConfig, FormStatus } from "@/lib/types/form";
import {
  AppMenu,
  AppMenuContent,
  AppMenuItem,
  AppMenuTrigger,
} from "@/design-system/app/AppMenu";
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
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
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
      label: "Analytics",
      path: "analytics",
    },
    {
      label: "Submissions",
      path: "submissions",
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
      toast.success({
        title: "Form permanently deleted",
        description:
          deletedCount > 0
            ? `Deleted form and ${deletedCount} submission${deletedCount > 1 ? "s" : ""}.`
            : "The form has been removed.",
      });
      router.push("/forms");
      router.refresh();
    } catch (error) {
      toast.error({
        title: "Delete failed",
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
          result.error?.message || "Unable to clear submissions right now.",
        );
      }

      const deletedCount = result.data?.deletedSubmissions || 0;
      toast.success({
        title: "Submissions cleared successfully",
        description: `Deleted ${deletedCount} submission${deletedCount !== 1 ? "s" : ""} and all field responses.`,
      });
      router.refresh();
    } catch (error) {
      toast.error({
        title: "Clear submissions failed",
        description:
          error instanceof Error
            ? error.message
            : "We could not clear submissions. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFormStatus = async (newStatus: FormStatus) => {
    if (form.status === newStatus) {
      toast.info({ title: "Form status is already set to " + newStatus });
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

      toast.success({
        title: statusMessages[newStatus] || "Status updated",
      });
      router.refresh();
    } catch (error) {
      toast.error({
        title: "Status update failed",
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
          <AppText variant="h1">{form.title}</AppText>
          <AppBadge label={statusLabel} variant={statusVariant} size="sm" />
        </div>

        <div className="flex items-center gap-4">
          {isBuilderPage && (
            <AppButton
              variant="outline"
              color="secondary"
              onClick={handleOpenPreview}
              disabled={isSubmitting}
            >
              <Eye size={16} />
              Preview
            </AppButton>
          )}
          <AppButton
            variant="solid"
            color="primary"
            onClick={handleAccess}
            disabled={isSubmitting || form.status !== "published"}
            title={
              form.status === "published"
                ? "Open public form"
                : "Publish form to enable public access"
            }
          >
            <ExternalLink size={16} />
            Access
          </AppButton>

          <AppMenu>
            <AppMenuTrigger
              disabled={isSubmitting}
              render={
                <AppButton
                  variant="ghost"
                  color="secondary"
                  size="sm"
                  disabled={isSubmitting}
                />
              }
            >
              <MoreVertical className="size-4" />
              <span className="sr-only">Open form actions</span>
            </AppMenuTrigger>
            <AppMenuContent align="end">
              {/* Publish option: shown in draft and archived forms */}
              {(form.status === "draft" || form.status === "archived") && (
                <AppMenuItem
                  onSelect={() => handleUpdateFormStatus("published")}
                >
                  <FileUp className="size-4" />
                  Publish
                </AppMenuItem>
              )}

              {/* Archive option: shown in draft and published forms */}
              {(form.status === "draft" || form.status === "published") && (
                <AppMenuItem
                  onSelect={() => handleUpdateFormStatus("archived")}
                >
                  <Archive className="size-4" />
                  Archive
                </AppMenuItem>
              )}

              {/* Clear submissions: shown in published and archived forms */}
              {(form.status === "published" || form.status === "archived") && (
                <AppMenuItem onSelect={() => setIsClearReportConfirmOpen(true)}>
                  <BrushCleaning className="size-4" />
                  Clear submissions
                </AppMenuItem>
              )}

              {/* Delete option: always shown */}
              <AppMenuItem
                className="text-app-error"
                onSelect={() => setIsDeleteConfirmOpen(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </AppMenuItem>
            </AppMenuContent>
          </AppMenu>
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
          <div className="max-h-[70vh] overflow-y-auto">
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
                  This action cannot be undone. All submissions, field responses
                  and analytics data will be permanently removed.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <AppButton
              variant="outline"
              color="secondary"
              onClick={() => setIsDeleteConfirmOpen(false)}
              disabled={isSubmitting}
            >
              Keep form
            </AppButton>
            <AppButton
              variant="solid"
              color="negative"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                handleDelete();
              }}
              disabled={isSubmitting}
            >
              Delete permanently
            </AppButton>
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
            <AppButton
              variant="outline"
              color="secondary"
              onClick={() => setIsClearReportConfirmOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </AppButton>
            <AppButton
              variant="solid"
              color="negative"
              onClick={() => {
                setIsClearReportConfirmOpen(false);
                handleClearReport();
              }}
              disabled={isSubmitting}
            >
              Clear submissions
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

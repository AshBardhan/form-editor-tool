"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useFormConfigStore } from "@/lib/stores";
import { switchFormTheme } from "@/lib/utils/domUtils";
import { AlertTriangle, ExternalLink, Eye, MoreVertical } from "lucide-react";
import Text from "@/components/ui/Text";

interface FormHeaderProps {
  form: FormConfig & { slug: string; status: FormStatus };
}

export function FormHeader({ form }: FormHeaderProps) {
  const router = useRouter();
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isUnpublishConfirmOpen, setIsUnpublishConfirmOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(
    DeviceType.DESKTOP,
  );

  const currentStatus: FormStatus =
    form.status === "published" ? "published" : "draft";
  const statusVariant = currentStatus === "published" ? "success" : "warning";
  const statusLabel = currentStatus === "published" ? "Published" : "Draft";

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
          label: "Field Analytics",
          path: "fields",
        },
      ],
    },
  ];

  useEffect(() => {
    setFormConfig(form);
  }, [form, setFormConfig]);

  useEffect(() => {
    if (isPreviewOpen) {
      switchFormTheme(form.theme);
    }
  }, [isPreviewOpen, form.theme]);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${form.slug}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as ApiResponse<{ id: string }>;
      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Unable to delete form right now.",
        );
      }

      toast.success("Form permanently deleted", {
        description: "The form and its submission reports were removed.",
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

  const handleUpdateFormStatus = async (nextStatus: FormStatus) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${form.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;
      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Unable to update status.");
      }

      toast.success(
        nextStatus === "published" ? "Form published" : "Form unpublished",
      );
      router.refresh();
    } catch (error) {
      toast.error("Status update failed", {
        description:
          error instanceof Error
            ? error.message
            : "We could not update publish status. Please try again.",
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
          <Button
            variant="secondary"
            onClick={() => setIsPreviewOpen(true)}
            disabled={isSubmitting}
          >
            <Eye className="size-4" />
            Preview
          </Button>
          <Button
            onClick={handleAccess}
            disabled={isSubmitting || currentStatus !== "published"}
            title={
              currentStatus === "published"
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
              <DropdownMenuItem
                onSelect={() =>
                  currentStatus === "published"
                    ? setIsUnpublishConfirmOpen(true)
                    : handleUpdateFormStatus("published")
                }
              >
                {currentStatus === "published" ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onSelect={() => setIsDeleteConfirmOpen(true)}
              >
                Delete form
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
        open={isUnpublishConfirmOpen}
        onOpenChange={setIsUnpublishConfirmOpen}
      >
        <ModalContent size="sm">
          <ModalHeader className="pb-2">
            <div className="flex gap-3">
              <AlertTriangle className="shrink-0 h-6 w-6 text-amber-600 dark:text-amber-500" />
              <div className="flex-1 flex flex-col gap-2">
                <ModalTitle>Unpublish this form?</ModalTitle>
                <ModalDescription>
                  Unpublishing will take this form offline immediately and pause
                  new submissions until it is published again.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsUnpublishConfirmOpen(false)}
              disabled={isSubmitting}
            >
              Keep published
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsUnpublishConfirmOpen(false);
                handleUpdateFormStatus("draft");
              }}
              disabled={isSubmitting}
            >
              Unpublish form
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

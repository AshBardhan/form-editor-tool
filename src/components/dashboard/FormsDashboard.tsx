"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { DashboardForm, FormStatus } from "@/lib/types/form";
import { FormsHeader } from "./FormsHeader";
import { FormList } from "./FormList";
import Text from "@/components/ui/Text";
import { PageContainer, PageHeader, PageContent } from "@/components/layout";
import { cn } from "@/lib/utils/styleUtils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";
import { FormConfig } from "@/lib/types/form";

interface FormsDashboardProps {
  forms: DashboardForm[];
}

/**
 * FormsDashboard - Main dashboard component
 * Combines FormsHeader and FormList with client-side filtering
 * Manages shared actions for all form cards
 */
export function FormsDashboard({ forms }: FormsDashboardProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | FormStatus>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formToDelete, setFormToDelete] = useState<DashboardForm | null>(null);

  const filteredForms = useMemo(() => {
    let filtered = forms;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((form) => form.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((form) =>
        form.title.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [forms, statusFilter, searchQuery]);

  const handleUpdateFormStatus = async (
    formId: string,
    nextStatus: FormStatus,
  ) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${formId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
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

      toast.success(statusMessages[nextStatus] || "Status updated");
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

  const handleDelete = async () => {
    if (!formToDelete) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forms/${formToDelete.id}`, {
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
      setFormToDelete(null);
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

  return (
    <>
      <PageHeader>
        <PageContainer>
          <FormsHeader
            filter={{
              search: searchQuery,
              status: statusFilter,
              onSearchChange: setSearchQuery,
              onStatusChange: setStatusFilter,
            }}
          />
        </PageContainer>
      </PageHeader>
      <PageContent>
        <PageContainer
          className={cn(
            "py-8",
            (filteredForms.length === 0 || forms.length === 0) && "h-full",
          )}
        >
          {forms.length === 0 ? (
            <div className="empty-content flex-col gap-2">
              <Text variant="h4">No forms yet</Text>
              <Text variant="p" className="text-sm text-muted-foreground">
                Create your first form to get started.
              </Text>
            </div>
          ) : (
            <FormList
              forms={filteredForms}
              onStatusUpdate={handleUpdateFormStatus}
              onDeleteRequest={setFormToDelete}
              isSubmitting={isSubmitting}
            />
          )}
        </PageContainer>
      </PageContent>

      <Modal
        open={!!formToDelete}
        onOpenChange={(open) => !open && setFormToDelete(null)}
      >
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
            <Button
              variant="outline"
              onClick={() => setFormToDelete(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete();
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
}

"use client";

import { DashboardForm, FormStatus } from "@/lib/types/form";
import { FormCard } from "./FormCard";
import { AppText } from "@/design-system/app/AppText";

interface FormListProps {
  forms: DashboardForm[];
  onStatusUpdate: (formId: string, status: FormStatus) => void;
  onDeleteRequest: (form: DashboardForm) => void;
  isSubmitting: boolean;
}

/**
 * FormList
 * - Displays a grid of form cards
 * - Handles empty state when no forms are available
 *
 * @param {FormListProps} props - The component props containing the list of forms.
 * @returns {JSX.Element} The rendered grid of form cards or an empty state message.
 */
export function FormList({
  forms,
  onStatusUpdate,
  onDeleteRequest,
  isSubmitting,
}: FormListProps) {
  if (!forms || forms.length === 0) {
    return (
      <div className="empty-content flex-col gap-2">
        <AppText variant="h4">No forms found</AppText>
        <AppText variant="p" className="text-sm text-app-fg-muted">
          Try adjusting your search or filter to find what you're looking for.
        </AppText>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onStatusUpdate={onStatusUpdate}
          onDeleteRequest={onDeleteRequest}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
}

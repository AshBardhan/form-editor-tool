"use client";

import { DashboardForms } from "@/lib/types/form";
import { FormCard } from "./FormCard";
import Text from "@/components/ui/Text";

interface FormListProps {
  forms: DashboardForms | null;
}

/**
 * FormList
 * - Displays a grid of form cards
 * - Handles empty state when no forms are available
 *
 * @param {FormListProps} props - The component props containing the list of forms.
 * @returns {JSX.Element} The rendered grid of form cards or an empty state message.
 */
export function FormList({ forms }: FormListProps) {
  if (!forms || forms.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="h4" className="mb-2">
          No forms yet
        </Text>
        <Text variant="p" className="text-sm text-muted-foreground">
          Create your first form to get started.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}

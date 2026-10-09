"use client";

import { useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import { AppInput } from "@/design-system/app/AppInput";
import { AppSelect } from "@/design-system/app/AppSelect";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";
import { FormConfig, FormFilterStatus } from "@/lib/types/form";
import { FormFilterOptions } from "@/lib/constants/form";

interface FormFilter {
  search?: string;
  status?: FormFilterStatus;
  onStatusChange?: (status: FormFilterStatus) => void;
  onSearchChange?: (query: string) => void;
}

interface FormsHeaderProps {
  filter?: FormFilter;
}

/**
 * FormsHeader - Main header for the dashboard page
 * Displays title, search, filter and create new form button
 */
export function FormsHeader({ filter = {} }: FormsHeaderProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNewForm = async () => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Form",
          theme: "light",
        }),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;
      const locationHeader = response.headers.get("Location");
      const slugFromLocation = locationHeader?.split("/").pop() || null;
      const createdSlug = result.data?.slug || slugFromLocation;

      if (!response.ok || !result.success || !createdSlug) {
        throw new Error(result.error?.message || "Failed to create form");
      }

      toast.success("Form has been successfully created");
      router.push(`/forms/${createdSlug}/builder`);
    } catch (error) {
      toast.error("Failed to create form", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to create form right now.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-app-brand-subtle rounded-lg">
            <FileText className="size-6 sm:size-10 text-app-brand" />
          </div>
          <div>
            <AppText variant="h1" className="mb-0.5 sm:mb-1">
              FormKit
            </AppText>
            <AppText variant="p">Create and manage your forms</AppText>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {filter && (
            <>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <AppInput
                  type="text"
                  placeholder="Search forms..."
                  value={filter.search}
                  onChange={(e) => {
                    filter.onSearchChange?.(e.target.value);
                  }}
                  className="pl-9"
                />
              </div>
              <AppSelect
                className="w-40"
                items={FormFilterOptions}
                value={filter.status}
                onValueChange={(value) => {
                  filter.onStatusChange?.(value as FormFilterStatus);
                }}
                placeholder="Select Status"
              />
            </>
          )}
          <AppButton
            variant="solid"
            color="primary"
            onClick={handleCreateNewForm}
            size="lg"
            className="gap-2"
            disabled={isCreating}
          >
            <Plus size={20} />
            {isCreating ? "Creating..." : "Create Form"}
          </AppButton>
        </div>
      </div>
    </>
  );
}

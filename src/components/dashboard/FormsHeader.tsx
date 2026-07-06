"use client";

import { useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/Select";
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
          <div className="p-3 bg-primary/10 rounded-lg">
            <FileText className="size-6 sm:size-10 text-primary" />
          </div>
          <div>
            <Text variant="h1" className="mb-0.5 sm:mb-1">
              FormKit
            </Text>
            <Text variant="p">Create and manage your forms</Text>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {filter && (
            <>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search forms..."
                  value={filter.search}
                  onChange={(e) => {
                    filter.onSearchChange?.(e.target.value);
                  }}
                  className="pl-9"
                />
              </div>

              <Select
                value={filter.status}
                onValueChange={(value) => {
                  filter.onStatusChange?.(value as FormFilterStatus);
                }}
              >
                <SelectTrigger>
                  <SelectValue>
                    {
                      FormFilterOptions.find(
                        (option) => option.value === filter.status,
                      )?.label
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FormFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <Button
            onClick={handleCreateNewForm}
            size="lg"
            className="gap-2"
            disabled={isCreating}
          >
            <Plus className="size-5" />
            {isCreating ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </div>
    </>
  );
}

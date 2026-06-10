"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { ApiResponse } from "@/lib/types/api";
import { FormConfig } from "@/lib/types/form";

/**
 * FormsHeader - Main header for the dashboard page
 * Displays title and create new form button
 */
export function FormsHeader() {
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
          title: "Untitled Form",
          theme: "light",
          blocks: [],
        }),
      });

      const result = (await response.json()) as ApiResponse<FormConfig>;

      if (!response.ok || !result.success || !result.data?.slug) {
        throw new Error(result.error?.message || "Failed to create form");
      }

      toast.success("form has been successfully created");
      router.push(`/forms/${result.data.slug}/builder`);
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
  );
}

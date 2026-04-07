import { FileText, Plus } from "lucide-react";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/**
 * DashboardHeader - Main header for the dashboard page
 * Displays title and create new form button
 */
export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FileText className="size-6 sm:size-10 text-primary" />
        </div>
        <div>
          <Text variant="h1" className="mb-0.5 sm:mb-1">
            FormKit GUI Builder
          </Text>
          <Text variant="p" className="text-muted-foreground">
            Create and manage your forms
          </Text>
        </div>
      </div>
      <Button asChild size="lg">
        <Link href="/forms/new" className="gap-2">
          <Plus className="size-5" />
          Create Form
        </Link>
      </Button>
    </div>
  );
}

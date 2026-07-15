"use client";

import { Archive, FileUp, MoreVertical, Trash2 } from "lucide-react";
import { DashboardForm, FormStatus } from "@/lib/types/form";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Metric from "@/components/ui/Metric";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { getFormMetrics } from "@/lib/utils/formUtils";
import { formStatusLabel, formStatusVariant } from "@/lib/constants/form";
import { formatDate } from "@/lib/utils/dateUtils";

interface FormCardProps {
  form: DashboardForm;
  onStatusUpdate: (formId: string, status: FormStatus) => void;
  onDeleteRequest: (form: DashboardForm) => void;
  isSubmitting: boolean;
}

/**
 * FormCard - Individual form tile with basic info
 * Displays form name, provides link to edit and includes action dropdown
 * Pure presentational component - delegates actions to parent
 */
export function FormCard({
  form,
  onStatusUpdate,
  onDeleteRequest,
  isSubmitting,
}: FormCardProps) {
  const statusVariant = formStatusVariant[form.status] ?? "neutral";
  const statusLabel = formStatusLabel[form.status];

  return (
    <Link href={`/forms/${form.slug}`} className="relative group">
      <Card clickable className="h-full">
        <CardContent className="px-6 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0 flex gap-3">
              <Text
                variant="h4"
                className="truncate group-hover:text-primary transition-colors"
              >
                {form.title}
              </Text>

              <Badge
                label={statusLabel}
                variant={statusVariant}
                size="sm"
                className="shrink-0"
              />
            </div>

            <div
              className="shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical className="size-4" />
                    <span className="sr-only">Open form actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Publish option: shown in draft and archived forms */}
                  {(form.status === "draft" || form.status === "archived") && (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        onStatusUpdate(form.id, "published");
                      }}
                    >
                      <FileUp className="size-4 mr-2" />
                      Publish
                    </DropdownMenuItem>
                  )}

                  {/* Archive option: shown in draft and published forms */}
                  {(form.status === "draft" || form.status === "published") && (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        onStatusUpdate(form.id, "archived");
                      }}
                    >
                      <Archive className="size-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  )}

                  {/* Delete option: always shown */}
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onSelect={(e) => {
                      e.preventDefault();
                      onDeleteRequest(form);
                    }}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {form.isAdmin && form.createdBy && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Created by:</span>
                <span>{form.createdBy}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="font-medium">Created:</span>
              <span>{formatDate(form.createdAt)}</span>
            </div>
            {form.status === "published" && form.publishedAt && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Published:</span>
                <span>{formatDate(form.publishedAt)}</span>
              </div>
            )}
          </div>

          {form.status !== "draft" && (
            <div className="flex gap-8">
              {getFormMetrics(form.metrics).map((metric) => (
                <Metric
                  key={metric.key}
                  direction="column"
                  label={metric.label}
                  reverse={true}
                  value={metric.value}
                  size="sm"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

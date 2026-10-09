"use client";

import Link from "next/link";
import { Archive, FileUp, MoreVertical, Trash2 } from "lucide-react";
import { DashboardForm, FormStatus } from "@/lib/types/form";
import { AppCard } from "@/design-system/app/AppCard";
import { AppMetric } from "@/design-system/app/AppMetric";
import { AppBadge } from "@/design-system/app/AppBadge";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import {
  AppMenu,
  AppMenuContent,
  AppMenuItem,
  AppMenuTrigger,
} from "@/design-system/app/AppMenu";
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
      <AppCard clickable={true}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 flex gap-3">
            <AppText
              variant="h4"
              className="truncate group-hover:text-app-brand transition-colors"
            >
              {form.title}
            </AppText>

            <AppBadge
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
            <AppMenu>
              <AppMenuTrigger
                disabled={isSubmitting}
                render={
                  <AppButton
                    variant="ghost"
                    color="secondary"
                    size="sm"
                    disabled={isSubmitting}
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
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
                    onSelect={(e) => {
                      e.preventDefault();
                      onStatusUpdate(form.id, "published");
                    }}
                  >
                    <FileUp className="size-4" />
                    Publish
                  </AppMenuItem>
                )}

                {/* Archive option: shown in draft and published forms */}
                {(form.status === "draft" || form.status === "published") && (
                  <AppMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      onStatusUpdate(form.id, "archived");
                    }}
                  >
                    <Archive className="size-4" />
                    Archive
                  </AppMenuItem>
                )}

                {/* Delete option: always shown */}
                <AppMenuItem
                  className="text-app-error"
                  onSelect={(e) => {
                    e.preventDefault();
                    onDeleteRequest(form);
                  }}
                >
                  <Trash2 className="size-4" />
                  Delete
                </AppMenuItem>
              </AppMenuContent>
            </AppMenu>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 mt-2">
          {form.isAdmin && form.createdBy && (
            <div className="flex items-center gap-1">
              <AppText variant="span" className="!text-xs font-medium">
                Created by:
              </AppText>
              <AppText variant="span" className="!text-xs">
                {form.createdBy}
              </AppText>
            </div>
          )}
          <div className="flex items-center gap-1">
            <AppText variant="span" className="!text-xs font-medium">
              Created:
            </AppText>
            <AppText variant="span" className="!text-xs">
              {formatDate(form.createdAt)}
            </AppText>
          </div>
          {form.status === "published" && form.publishedAt && (
            <div className="flex items-center gap-1">
              <AppText variant="span" className="!text-xs font-medium">
                Published:
              </AppText>
              <AppText variant="span" className="!text-xs">
                {formatDate(form.publishedAt)}
              </AppText>
            </div>
          )}
        </div>

        {form.status !== "draft" && (
          <div className="flex gap-8 mt-4">
            {getFormMetrics(form.metrics).map((metric) => (
              <AppMetric
                key={metric.key}
                direction="column"
                label={metric.label}
                reverse={true}
                value={metric.value}
              />
            ))}
          </div>
        )}
      </AppCard>
    </Link>
  );
}

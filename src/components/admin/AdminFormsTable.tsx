"use client";

/**
 * Admin Forms Table
 * Displays all forms across users
 */

import Link from "next/link";
import { AppBadge } from "@/design-system/app/AppBadge";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import { formStatusLabel, formStatusVariant } from "@/lib/constants/form";
import { FormStatus } from "@/lib/types/form";

interface Form {
  id: string;
  title: string;
  slug: string;
  status: FormStatus;
  views: number;
  starts: number;
  completions: number;
  createdAt: Date;
  user: {
    id: number;
    name: string | null;
    email: string;
  };
  _count: {
    blocks: number;
    submissions: number;
  };
}

interface AdminFormsTableProps {
  forms: Form[];
}

export function AdminFormsTable({ forms }: AdminFormsTableProps) {
  return (
    <table className="w-full rounded-lg border border-app-border-subtle overflow-hidden">
      <thead className="border-b border-app-border-subtle bg-app-field-placeholder text-app-field/80 text-xs font-semibold uppercase">
        <tr>
          <th className="px-4 py-3 text-left">Form</th>
          <th className="px-4 py-3 text-left">Owner</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Views</th>
          <th className="px-4 py-3 text-left">Submissions</th>
          <th className="px-4 py-3 text-left">Created</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {forms.map((form) => (
          <tr
            key={form.id}
            className="bg-app-surface even:bg-app-surface-muted hover:bg-app-surface-strong text-xs"
          >
            <td className="px-4 py-3">
              <AppText variant="h6">{form.title}</AppText>
              <AppText className="!text-xs text-app-fg-muted">
                /{form.slug}
              </AppText>
            </td>
            <td className="px-4 py-3">
              <AppText variant="h6">{form.user.name || "—"}</AppText>
              <AppText className="!text-xs text-app-fg-muted">
                {form.user.email}
              </AppText>
            </td>
            <td className="px-4 py-3">
              <AppBadge
                label={formStatusLabel[form.status] ?? "Draft"}
                variant={formStatusVariant[form.status] ?? "neutral"}
                size="sm"
              />
            </td>

            <td className="px-4 py-3">{form.views ?? 0}</td>
            <td className="px-4 py-3">{form._count.submissions ?? 0}</td>
            <td className="px-4 py-3">
              {new Date(form.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-3 text-right">
              <AppButton
                render={<Link href={`/forms/${form.slug}/builder`} />}
                variant="outline"
                color="primary"
                size="sm"
              >
                View
              </AppButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

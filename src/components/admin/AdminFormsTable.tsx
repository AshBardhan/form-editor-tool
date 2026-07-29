"use client";

/**
 * Admin Forms Table
 * Displays all forms across users
 */

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

interface Form {
  id: string;
  title: string;
  slug: string;
  status: string;
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
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "neutral";
      case "archived":
        return "info";
      default:
        return "neutral";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Form
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Metrics
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {forms.map((form) => (
            <tr key={form.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{form.title}</div>
                  <div className="text-sm text-gray-500">/{form.slug}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {form.user.name || "—"}
                  </div>
                  <div className="text-xs text-gray-500">{form.user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge
                  label={form.status}
                  variant={getStatusVariant(form.status)}
                  size="sm"
                />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  <div>{form.views} views</div>
                  <div className="text-gray-500">
                    {form._count.submissions} submissions
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(form.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/forms/${form.slug}/builder`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

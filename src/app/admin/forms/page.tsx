/**
 * Admin Forms Page
 * Forms management dashboard
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AdminFormsTable } from "@/components/admin/AdminFormsTable";
import { AppText } from "@/design-system/app/AppText";
import { AppMetric } from "@/design-system/app/AppMetric";

async function getForms() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  const forms = await prisma.form.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      views: true,
      starts: true,
      completions: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          blocks: true,
          submissions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return forms;
}

export default async function AdminFormsPage() {
  const forms = await getForms();

  const totalViews = forms.reduce((sum, f) => sum + f.views, 0);
  const totalSubmissions = forms.reduce(
    (sum, f) => sum + f._count.submissions,
    0,
  );

  return (
    <div>
      <div className="mb-6">
        <AppText variant="h2">Forms Management</AppText>
        <AppText variant="p" className="mt-1 text-app-fg-muted">
          Monitor and manage all forms across the platform
        </AppText>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <AppMetric value={forms.length} label="Total Forms" />
          <AppMetric
            value={forms.filter((f) => f.status === "published").length}
            label="Published"
          />
          <AppMetric value={totalViews} label="Total Views" />
          <AppMetric value={totalSubmissions} label="Total Submissions" />
        </div>
      </div>

      <AdminFormsTable forms={forms} />
    </div>
  );
}

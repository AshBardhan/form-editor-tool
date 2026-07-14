/**
 * Admin Forms Page
 * Forms management dashboard
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AdminFormsTable } from "@/components/admin/AdminFormsTable";

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
        <h2 className="text-2xl font-bold text-gray-900">Forms Management</h2>
        <p className="text-gray-600 mt-1">
          Monitor and manage all forms across the platform
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-600">Total Forms</div>
            <div className="text-2xl font-bold text-gray-900">
              {forms.length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-gray-900">
              {forms.filter((f) => f.status === "published").length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Views</div>
            <div className="text-2xl font-bold text-gray-900">{totalViews}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Submissions</div>
            <div className="text-2xl font-bold text-gray-900">
              {totalSubmissions}
            </div>
          </div>
        </div>
      </div>

      <AdminFormsTable forms={forms} />
    </div>
  );
}

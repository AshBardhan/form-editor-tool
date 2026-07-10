/**
 * Admin Analytics Page
 * Platform-wide analytics and statistics
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getAnalytics() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  const [
    totalUsers,
    totalForms,
    totalSubmissions,
    publishedForms,
    clientCount,
    adminCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.form.count(),
    prisma.formSubmission.count(),
    prisma.form.count({ where: { status: "published" } }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
  ]);

  // Get recent activity
  const recentForms = await prisma.form.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const recentSubmissions = await prisma.formSubmission.findMany({
    take: 5,
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      submittedAt: true,
      form: {
        select: {
          title: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    overview: {
      totalUsers,
      totalForms,
      totalSubmissions,
      publishedForms,
      clientCount,
      adminCount,
    },
    recentActivity: {
      forms: recentForms,
      submissions: recentSubmissions,
    },
  };
}

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalytics();
  const { overview, recentActivity } = analytics;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
        <p className="text-gray-600 mt-1">
          Overview of platform usage and activity
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-gray-900">
            {overview.totalUsers}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {overview.clientCount} clients, {overview.adminCount} admins
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Forms</div>
          <div className="text-3xl font-bold text-gray-900">
            {overview.totalForms}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {overview.publishedForms} published
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Submissions</div>
          <div className="text-3xl font-bold text-gray-900">
            {overview.totalSubmissions}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {overview.totalForms > 0
              ? (overview.totalSubmissions / overview.totalForms).toFixed(1)
              : 0}{" "}
            avg per form
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Forms */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Forms</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.forms.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No forms yet
              </div>
            ) : (
              recentActivity.forms.map((form: any) => (
                <div key={form.id} className="px-6 py-4">
                  <div className="font-medium text-gray-900">{form.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    by {form.user.name || form.user.email} •{" "}
                    {new Date(form.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Submissions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.submissions.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No submissions yet
              </div>
            ) : (
              recentActivity.submissions.map((submission: any) => (
                <div key={submission.id} className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {submission.form.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    by {submission.form.user.name} •{" "}
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Admin Analytics Page
 * Platform-wide analytics and statistics
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppText } from "@/design-system/app/AppText";

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
        <AppText variant="h2">Platform Analytics</AppText>
        <AppText variant="p" className="mt-1 text-app-fg-muted">
          Overview of platform usage and activity
        </AppText>
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
            <AppText variant="h3">Recent Forms</AppText>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.forms.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <AppText>No forms yet</AppText>
              </div>
            ) : (
              recentActivity.forms.map((form) => (
                <div key={form.id} className="px-6 py-4">
                  <AppText variant="h4">{form.title}</AppText>
                  <AppText variant="p" className="mt-1">
                    by {form.user.name || form.user.email} •{" "}
                    {new Date(form.createdAt).toLocaleDateString()}
                  </AppText>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <AppText variant="h3">Recent Submissions</AppText>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.submissions.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <AppText>No submissions yet</AppText>
              </div>
            ) : (
              recentActivity.submissions.map((submission) => (
                <div key={submission.id} className="px-6 py-4">
                  <AppText variant="h4">{submission.form.title}</AppText>
                  <AppText variant="p" className="mt-1">
                    by {submission.form.user.name} •{" "}
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </AppText>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

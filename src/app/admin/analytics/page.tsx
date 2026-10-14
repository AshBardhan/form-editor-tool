/**
 * Admin Analytics Page
 * Platform-wide analytics and statistics
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";
import { AppMetric } from "@/design-system/app/AppMetric";

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
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-8">
        <AppCard>
          <div className="grid grid-cols-3 gap-2">
            <AppMetric label="Total Users" value={overview.totalUsers} />
            <AppMetric label="Clients" value={overview.clientCount} />
            <AppMetric label="Admins" value={overview.adminCount} />
          </div>
        </AppCard>

        <AppCard>
          <div className="grid grid-cols-2 gap-2">
            <AppMetric label="Total Forms" value={overview.totalForms} />
            <AppMetric label="Published" value={overview.publishedForms} />
          </div>
        </AppCard>

        <AppCard>
          <div className="grid grid-cols-2 gap-2">
            <AppMetric
              label="Total Submissions"
              value={overview.totalSubmissions}
            />
            <AppMetric
              label="Avg Submissions per Form"
              value={
                overview.totalForms > 0
                  ? (overview.totalSubmissions / overview.totalForms).toFixed(1)
                  : 0
              }
            />
          </div>
        </AppCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Forms */}
        <AppCard>
          <AppText variant="h3">Recent Forms</AppText>
          <div className="divide-y divide-app-border-subtle">
            {recentActivity.forms.length === 0 ? (
              <div className="py-4 text-center">
                <AppText className="text-app-fg-muted">No forms yet</AppText>
              </div>
            ) : (
              recentActivity.forms.map((form) => (
                <div key={form.id} className="py-4 space-y-1">
                  <AppText variant="h5">{form.title}</AppText>
                  <AppText variant="p" className="!text-xs text-app-fg-muted">
                    by {form.user.name || form.user.email} •{" "}
                    {new Date(form.createdAt).toLocaleDateString()}
                  </AppText>
                </div>
              ))
            )}
          </div>
        </AppCard>

        {/* Recent Submissions */}
        <AppCard>
          <AppText variant="h3">Recent Submissions</AppText>
          <div className="divide-y divide-app-border-subtle">
            {recentActivity.submissions.length === 0 ? (
              <div className="py-4 text-center">
                <AppText className="text-app-fg-muted">
                  No submissions yet
                </AppText>
              </div>
            ) : (
              recentActivity.submissions.map((submission) => (
                <div key={submission.id} className="py-4 space-y-1">
                  <AppText variant="h5">{submission.form.title}</AppText>
                  <AppText variant="p" className="!text-xs text-app-fg-muted">
                    by {submission.form.user.name} •{" "}
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </AppText>
                </div>
              ))
            )}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

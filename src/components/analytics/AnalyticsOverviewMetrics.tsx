"use client";

import { AppCard } from "@/design-system/app/AppCard";
import { AppText } from "@/design-system/app/AppText";
import { AppMetric } from "@/design-system/app/AppMetric";
import { FormAnalyticsMetrics } from "@/lib/types/form";

interface AnalyticsOverviewMetricsProps {
  metrics: FormAnalyticsMetrics;
}

export function AnalyticsOverviewMetrics({
  metrics,
}: AnalyticsOverviewMetricsProps) {
  const {
    views = 0,
    submissions = 0,
    starts = 0,
    completions = 0,
    submitAttempts = 0,
  } = metrics;

  const conversionRate = views > 0 ? (submissions / views) * 100 : 0;
  const completionRate = starts > 0 ? (completions / starts) * 100 : 0;
  const successRate =
    submitAttempts > 0 ? (submissions / submitAttempts) * 100 : 0;
  const failedSubmissions = Math.max(submitAttempts - submissions, 0);
  const errorRate =
    submitAttempts > 0 ? (failedSubmissions / submitAttempts) * 100 : 0;

  return (
    <AppCard className="space-y-6">
      <div className="space-y-2">
        <AppText variant="h5">Basic Metrics</AppText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppMetric direction="column" label="Views" value={views} size="lg" />
          <AppMetric
            direction="column"
            label="Submissions"
            value={submissions}
            size="lg"
          />
          <AppMetric
            direction="column"
            label="Conversion Rate"
            value={`${conversionRate.toFixed(2)}%`}
            size="lg"
          />
        </div>
      </div>
      <div className="space-y-2">
        <AppText variant="h5">Advanced Metrics</AppText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppMetric
            direction="column"
            label="Starts"
            value={starts}
            size="lg"
          />
          <AppMetric
            direction="column"
            label="Completions"
            value={completions}
            size="lg"
          />
          {completionRate > 0 && (
            <AppMetric
              direction="column"
              label="Completion Rate"
              value={`${completionRate.toFixed(2)}%`}
              size="lg"
            />
          )}
          {submitAttempts > 0 && (
            <AppMetric
              direction="column"
              label="Submit Attempts"
              value={submitAttempts}
              size="lg"
            />
          )}
          {failedSubmissions > 0 && (
            <AppMetric
              direction="column"
              label="Failed Submissions"
              value={failedSubmissions}
              size="lg"
            />
          )}

          {successRate > 0 && (
            <AppMetric
              direction="column"
              label="Submission Success Rate"
              value={`${successRate.toFixed(2)}%`}
              size="lg"
            />
          )}
          {errorRate > 0 && (
            <AppMetric
              direction="column"
              label="Submission Error Rate"
              value={`${errorRate.toFixed(2)}%`}
              size="lg"
            />
          )}
        </div>
      </div>
    </AppCard>
  );
}

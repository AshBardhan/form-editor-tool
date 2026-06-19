"use client";

import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import Metric from "@/components/ui/Metric";
import { FormReportMetrics } from "@/lib/types/form";

interface ResponseMetricsProps {
  metrics: FormReportMetrics;
}

export function ReportMetrics({ metrics }: ResponseMetricsProps) {
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
    <Card>
      <CardContent className="px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Text variant="h5">Basic Metrics</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Metric
                direction="column"
                label="Views"
                value={views}
                size="lg"
              />
              <Metric
                direction="column"
                label="Submissions"
                value={submissions}
                size="lg"
              />
              <Metric
                direction="column"
                label="Conversion Rate"
                value={`${conversionRate.toFixed(2)}%`}
                size="lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Text variant="h5">Advanced Metrics</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Metric
                direction="column"
                label="Starts"
                value={starts}
                size="lg"
              />
              <Metric
                direction="column"
                label="Completions"
                value={completions}
                size="lg"
              />
              {completionRate > 0 && (
                <Metric
                  direction="column"
                  label="Completion Rate"
                  value={`${completionRate.toFixed(2)}%`}
                  size="lg"
                />
              )}
              {submitAttempts > 0 && (
                <Metric
                  direction="column"
                  label="Submit Attempts"
                  value={submitAttempts}
                  size="lg"
                />
              )}
              {failedSubmissions > 0 && (
                <Metric
                  direction="column"
                  label="Failed Submissions"
                  value={failedSubmissions}
                  size="lg"
                />
              )}

              {successRate > 0 && (
                <Metric
                  direction="column"
                  label="Submission Success Rate"
                  value={`${successRate.toFixed(2)}%`}
                  size="lg"
                />
              )}
              {errorRate > 0 && (
                <Metric
                  direction="column"
                  label="Submission Error Rate"
                  value={`${errorRate.toFixed(2)}%`}
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/Card";
import Metric from "@/components/ui/Metric";

interface Submission {
  id: string;
  submittedAt: string;
  responses: unknown[];
}

interface ResponseMetricsProps {
  submissions: Submission[];
}

function getRecentCount(submissions: Submission[], hours: number): number {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - hours);

  return submissions.filter((s) => new Date(s.submittedAt) >= cutoff).length;
}

export function ResponseMetrics({ submissions }: ResponseMetricsProps) {
  const total = submissions.length;
  const last24h = getRecentCount(submissions, 24);
  const last7days = getRecentCount(submissions, 24 * 7);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Metric
            direction="column"
            label="Total Responses"
            value={total}
            size="lg"
          />
          <Metric
            direction="column"
            label="Last 24 Hours"
            value={last24h}
            size="lg"
          />
          <Metric
            direction="column"
            label="Last 7 Days"
            value={last7days}
            size="lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}

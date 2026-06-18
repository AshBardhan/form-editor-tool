"use client";

import { Card, CardContent } from "@/components/ui/Card";
import Metric from "@/components/ui/Metric";
import { FormReportMetrics } from "@/lib/types/form";

interface ResponseMetricsProps {
  metrics: FormReportMetrics;
}

export function ReportMetrics({ metrics }: ResponseMetricsProps) {
  const { views = 0, submissions = 0 } = metrics ?? {};
  const submissionRate = views > 0 ? (submissions / views) * 100 : 0;

  return (
    <Card>
      <CardContent className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Metric
            direction="column"
            label="Submissions"
            value={submissions}
            size="lg"
          />
          <Metric direction="column" label="Views" value={views} size="lg" />
          <Metric
            direction="column"
            label="Conversion Rate"
            value={`${submissionRate.toFixed(2)}%`}
            size="lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}

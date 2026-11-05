import { notFound } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";
import { AnalyticsOverviewMetrics } from "@/components/analytics/AnalyticsOverviewMetrics";
import { getFormAnalyticsOverviewData } from "@/lib/queries/forms";

export default async function AnalyticsOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFormAnalyticsOverviewData(slug);

  if (!data) {
    notFound();
  }

  if (data.metrics.views > 0) {
    return <AnalyticsOverviewMetrics metrics={data.metrics} />;
  }

  return (
    <AppCard className="text-center py-20">
      <AppText variant="h5">No activity yet</AppText>
      <AppText variant="p" className="text-sm text-app-fg-muted">
        Metrics will appear once your form receives its first view.
      </AppText>
    </AppCard>
  );
}

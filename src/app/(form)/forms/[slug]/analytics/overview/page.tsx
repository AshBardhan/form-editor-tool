import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
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
    <Card className="text-center py-20">
      <Text variant="h5">No Data Recorded</Text>
      <Text className="text-muted-foreground">
        The results will be shown once the form is viewed.
      </Text>
    </Card>
  );
}

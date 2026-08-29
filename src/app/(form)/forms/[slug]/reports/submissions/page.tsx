import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { SubmissionsList } from "@/components/reports/SubmissionsList";
import { ReportMetrics } from "@/components/reports/ReportMetrics";
import { getFormReportData } from "@/lib/queries/forms";

/**
 * Renders the submissions report using the shared cached submissions payload.
 */
export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getFormReportData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Metrics */}
      {data.metrics && data.metrics.views > 0 ? (
        <ReportMetrics metrics={data.metrics} />
      ) : (
        <Card className="text-center py-20">
          <Text variant="h5">No Data Recorded</Text>
          <Text className="text-muted-foreground">
            The results will be shown once the form is viewed.
          </Text>
        </Card>
      )}

      {/* Submissions List */}
      {data.submissions.length > 0 && (
        <SubmissionsList
          fieldBlocks={data.fieldBlocks}
          submissions={data.submissions}
        />
      )}
    </>
  );
}

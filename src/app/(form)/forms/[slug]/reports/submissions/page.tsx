import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { SubmissionsList } from "@/components/reports/SubmissionsList";
import { ReportMetrics } from "@/components/reports/ReportMetrics";
import { getFormReportPageData } from "@/lib/queries/forms";

/**
 * Renders the submissions report using the shared cached submissions payload.
 */
export default async function FormSubmissionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getFormReportPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <Text variant="h3" className="text-foreground">
        Form Submissions
      </Text>

      {/* Metrics */}
      <ReportMetrics metrics={data.metrics} />

      {/* Submissions List */}
      {data.submissions.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No submissions yet. Share your form to start collecting submissions.
          </Text>
        </div>
      ) : (
        <SubmissionsList submissions={data.submissions} />
      )}
    </div>
  );
}

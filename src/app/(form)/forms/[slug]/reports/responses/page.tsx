import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { ResponseList } from "@/components/reports/ResponseList";
import { ResponseMetrics } from "@/components/reports/ResponseMetrics";
import { getFormReportPageData } from "@/lib/queries/forms";

/**
 * Renders the response report using the shared cached submissions payload.
 */
export default async function FormResponsesPage({
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
        Form Responses
      </Text>

      {/* Metrics */}
      <ResponseMetrics submissions={data.submissions} />

      {/* Responses List */}
      {data.submissions.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No responses yet. Share your form to start collecting submissions.
          </Text>
        </div>
      ) : (
        <ResponseList submissions={data.submissions} />
      )}
    </div>
  );
}

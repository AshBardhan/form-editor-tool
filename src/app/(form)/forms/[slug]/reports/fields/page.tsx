import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { FieldAnalysisList } from "@/components/reports/FieldAnalysisList";
import { getFormReportPageData } from "@/lib/queries/forms";

/**
 * Renders the field analysis report using the shared cached submissions payload.
 */
export default async function FieldAnalysisPage({
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
        Field-by-Field Analysis
      </Text>
      {/* Field Analysis */}
      {data.submissions.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No responses yet. Share your form to start collecting submissions.
          </Text>
        </div>
      ) : (
        <FieldAnalysisList
          submissions={data.submissions}
          totalSubmissions={data.submissions.length}
        />
      )}
    </div>
  );
}

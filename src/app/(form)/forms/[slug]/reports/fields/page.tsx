import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
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
    <>
      {data.submissions.length === 0 ? (
        <Card className="text-center">
          <Text variant="h5">No Data Recorded</Text>
          <Text className="text-muted-foreground">
            Share your form to start collecting submissions.
          </Text>
        </Card>
      ) : (
        <FieldAnalysisList submissions={data.submissions} />
      )}
    </>
  );
}

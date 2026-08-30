import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { FieldAnalysisList } from "@/components/analytics/FieldAnalysisList";
import { getFormFieldAnalysisData } from "@/lib/queries/forms";

export default async function AnalyticsFieldsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFormFieldAnalysisData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {data.submissionCount === 0 ? (
        <Card className="text-center py-20">
          <Text variant="h5">No Data Recorded</Text>
          <Text className="text-muted-foreground">
            Share your form to start collecting submissions.
          </Text>
        </Card>
      ) : (
        <FieldAnalysisList
          fieldBlocks={data.fieldBlocks}
          submissionCount={data.submissionCount}
          responses={data.responses}
        />
      )}
    </>
  );
}

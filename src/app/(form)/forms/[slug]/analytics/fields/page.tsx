import { notFound } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";
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
        <AppCard className="text-center py-20">
          <AppText variant="h5">No Data Recorded</AppText>
          <AppText variant="p" className="text-sm text-app-fg-muted">
            Share your form to start collecting submissions.
          </AppText>
        </AppCard>
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

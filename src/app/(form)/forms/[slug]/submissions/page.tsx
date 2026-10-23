import { notFound } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";
import { SubmissionsList } from "@/components/submissions/SubmissionsList";
import { getFormSubmissionsListData } from "@/lib/queries/forms";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFormSubmissionsListData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {data.submissions.length === 0 ? (
        <AppCard className="text-center py-20">
          <AppText variant="h5">No Data Recorded</AppText>
          <AppText variant="p" className="text-sm text-app-fg-muted">
            Share your form to start collecting submissions.
          </AppText>
        </AppCard>
      ) : (
        <SubmissionsList
          fieldBlocks={data.fieldBlocks}
          submissions={data.submissions}
        />
      )}
    </>
  );
}

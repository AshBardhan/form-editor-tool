import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
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
        <Card className="text-center py-20">
          <Text variant="h5">No Data Recorded</Text>
          <Text className="text-muted-foreground">
            Share your form to start collecting submissions.
          </Text>
        </Card>
      ) : (
        <SubmissionsList
          fieldBlocks={data.fieldBlocks}
          submissions={data.submissions}
        />
      )}
    </>
  );
}

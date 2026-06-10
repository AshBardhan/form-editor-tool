import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Text from "@/components/ui/Text";
import { FieldAnalysisList } from "@/components/responses/FieldAnalysisList";

export default async function FieldAnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const form = await prisma.form.findUnique({
    where: { slug },
    select: { id: true, title: true },
  });

  if (!form) {
    notFound();
  }

  const submissions = await prisma.formSubmission.findMany({
    where: { formId: form.id },
    include: {
      responses: {
        include: {
          block: true,
        },
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  const mappedSubmissions = submissions.map((submission) => ({
    id: submission.id,
    submittedAt: submission.submittedAt.toISOString(),
    responses: submission.responses.map((response) => ({
      id: response.id,
      blockId: response.blockId,
      blockType: response.block.type,
      blockName: response.block.name,
      blockProps: response.block.props as Record<
        string,
        string | number | boolean | string[] | undefined
      >,
      value: response.value as string | number | boolean | string[] | null,
    })),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Text variant="h3" className="text-foreground">
          {form.title}
        </Text>
        <Text className="text-muted-foreground">Field-by-Field Analysis</Text>
      </div>

      {/* Field Analysis */}
      {mappedSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No responses yet. Share your form to start collecting submissions.
          </Text>
        </div>
      ) : (
        <FieldAnalysisList
          submissions={mappedSubmissions}
          totalSubmissions={mappedSubmissions.length}
        />
      )}
    </div>
  );
}

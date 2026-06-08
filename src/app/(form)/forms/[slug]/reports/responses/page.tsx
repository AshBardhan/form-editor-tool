import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ResponseList } from "@/components/responses/ResponseList";
import { ResponseMetrics } from "@/components/responses/ResponseMetrics";
export default async function FormResponsesPage({
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Text variant="h3" className="text-foreground">
            {form.title}
          </Text>
          <Text className="text-muted-foreground">Form Responses</Text>
        </div>
        <div className="flex gap-3">
          <Link href={`/forms/${slug}/reports/fields`}>
            <Button variant="secondary" size="sm">
              Field Analysis
            </Button>
          </Link>
          <Link href={`/forms/${slug}/builder`}>
            <Button variant="secondary" size="sm">
              Back to Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <ResponseMetrics submissions={mappedSubmissions} />

      {/* Responses List */}
      {mappedSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No responses yet. Share your form to start collecting submissions.
          </Text>
        </div>
      ) : (
        <ResponseList submissions={mappedSubmissions} />
      )}
    </div>
  );
}

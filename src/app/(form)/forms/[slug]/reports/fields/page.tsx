"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FieldAnalysisList } from "@/components/responses/FieldAnalysisList";
import { Skeleton } from "@/components/ui/Skeleton";
import { FormBlockProps } from "@/lib/types/form";

interface Response {
  id: string;
  blockId: string;
  blockType: string;
  blockName: string;
  blockProps: FormBlockProps;
  value: string | number | boolean | string[] | null;
}

interface Submission {
  id: string;
  submittedAt: string;
  responses: Response[];
}

interface ResponsesData {
  form: {
    id: string;
    title: string;
  };
  submissions: Submission[];
  totalSubmissions: number;
}

export default function FieldAnalysisPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<ResponsesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const response = await fetch(`/api/forms/${slug}/responses`);
        if (!response.ok) {
          throw new Error("Failed to fetch responses");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchResponses();
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 space-y-4">
        <Text variant="h3" className="text-error">
          Error Loading Analysis
        </Text>
        <Text className="text-muted-foreground">
          {error || "Unable to load field analysis"}
        </Text>
        <Link href="/forms">
          <Button variant="secondary" size="sm">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Text variant="h3" className="text-foreground">
            {data.form.title}
          </Text>
          <Text className="text-muted-foreground">Field-by-Field Analysis</Text>
        </div>
        <div className="flex gap-3">
          <Link href={`/forms/${slug}/reports/responses`}>
            <Button variant="secondary" size="sm">
              View Responses
            </Button>
          </Link>
          <Link href={`/forms/${slug}/builder`}>
            <Button variant="secondary" size="sm">
              Back to Editor
            </Button>
          </Link>
        </div>
      </div>

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
          totalSubmissions={data.totalSubmissions}
        />
      )}
    </div>
  );
}

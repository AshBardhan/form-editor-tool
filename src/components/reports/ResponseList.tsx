"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

interface Response {
  id: string;
  blockId: string;
  blockType: string;
  blockName: string;
  blockProps: Record<string, string | number | boolean | string[] | undefined>;
  value: string | number | boolean | string[] | null;
}

interface Submission {
  id: string;
  submittedAt: string;
  responses: Response[];
}

interface ResponseListProps {
  submissions: Submission[];
}

function formatValue(
  value: string | number | boolean | string[] | null,
): string {
  if (value === null || value === undefined) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ResponseList({ submissions }: ResponseListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {submissions.map((submission, index) => {
        const isExpanded = expandedId === submission.id;
        const responseCount = submission.responses.length;

        return (
          <Card
            key={submission.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => toggleExpand(submission.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Text variant="h5" className="font-semibold">
                    Response #{submissions.length - index}
                  </Text>
                  <Text variant="p" className="text-muted-foreground text-sm">
                    {formatDate(submission.submittedAt)} • {responseCount}{" "}
                    {responseCount === 1 ? "field" : "fields"}
                  </Text>
                </div>
                <Badge
                  label={isExpanded ? "Collapse" : "Expand"}
                  variant="neutral"
                  size="sm"
                />
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  {submission.responses.map((response) => {
                    const label =
                      response.blockProps?.label || response.blockName;
                    const value = formatValue(response.value);

                    return (
                      <div key={response.id} className="space-y-1">
                        <Text
                          variant="p"
                          className="text-foreground text-sm font-semibold"
                        >
                          {label}
                        </Text>
                        <Text
                          variant="p"
                          className="pl-2 text-muted-foreground"
                        >
                          {value}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

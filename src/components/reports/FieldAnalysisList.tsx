"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { type FormSubmission } from "@/lib/types/form";
import { type FieldData, type FieldAnalysisResult } from "@/lib/types/reports";

interface FieldAnalysisListProps {
  submissions: FormSubmission[];
  totalSubmissions: number;
}

function formatValue(
  value: string | number | boolean | string[] | null,
): string {
  if (value === null || value === undefined) return "(Empty)";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function analyzeField(field: FieldData): FieldAnalysisResult {
  const values = field.responses.filter((v) => v !== null && v !== undefined);

  // For choice-based fields (radio, select, checkbox)
  if (["radio", "select", "checkbox"].includes(field.blockType)) {
    const valueCounts: Record<string, number> = {};

    values.forEach((value) => {
      const key = Array.isArray(value) ? value.join(", ") : String(value);
      valueCounts[key] = (valueCounts[key] || 0) + 1;
    });

    const sortedValues = Object.entries(valueCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([value, count]) => ({
        value,
        count,
        percentage: ((count / field.responseCount) * 100).toFixed(1),
      }));

    return { type: "choices", data: sortedValues };
  }

  // For text-based fields
  return {
    type: "list",
    data: values as (string | number | boolean | string[])[],
  };
}

export function FieldAnalysisList({
  submissions,
  totalSubmissions,
}: FieldAnalysisListProps) {
  const fieldAnalysis = useMemo(() => {
    const fieldMap = new Map<string, FieldData>();

    submissions.forEach((submission) => {
      submission.responses.forEach((response) => {
        if (!fieldMap.has(response.blockId)) {
          const labelValue = response.blockProps?.label;
          const label =
            typeof labelValue === "string" ? labelValue : response.blockName;

          fieldMap.set(response.blockId, {
            blockId: response.blockId,
            blockName: response.blockName,
            blockType: response.blockType,
            label,
            responses: [],
            responseCount: 0,
            responseRate: 0,
          });
        }

        const field = fieldMap.get(response.blockId)!;
        field.responses.push(response.value);
        field.responseCount++;
      });
    });

    // Calculate response rates
    fieldMap.forEach((field) => {
      field.responseRate = (field.responseCount / totalSubmissions) * 100;
    });

    return Array.from(fieldMap.values());
  }, [submissions, totalSubmissions]);

  return (
    <div className="space-y-4">
      {fieldAnalysis.map((field) => {
        const analysis = analyzeField(field);

        return (
          <Card key={field.blockId}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Field Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Text variant="h4" className="text-foreground">
                      {field.label}
                    </Text>
                    <div className="flex gap-2 items-center">
                      <Badge
                        label={field.blockType}
                        variant="neutral"
                        size="sm"
                      />
                      <Text
                        variant="p"
                        className="text-muted-foreground text-sm"
                      >
                        {field.responseCount} responses •{" "}
                        {field.responseRate.toFixed(1)}% response rate
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Field Analysis */}
                <div className="border-t border-border pt-4">
                  {analysis.type === "choices" && (
                    <div className="space-y-3">
                      {analysis.data.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                              <Text className="text-foreground">
                                {item.value}
                              </Text>
                              <Badge
                                label={`${item.count} (${item.percentage}%)`}
                                variant="neutral"
                                size="sm"
                              />
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden max-w-md">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {analysis.type === "list" && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {analysis.data.map((value, index) => (
                        <div
                          key={index}
                          className="p-3 bg-muted/50 rounded border border-border"
                        >
                          <Text className="text-foreground">
                            {formatValue(value)}
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import Metric from "@/components/ui/Metric";
import { type FormBlock, type FormBlockType } from "@/lib/types/form";
import {
  type FieldData,
  type FormFieldResponseValue,
} from "@/lib/types/analytics";
import {
  getFieldBlockLabel,
  isChoiceBasedFieldBlock,
  isTextBasedFieldBlock,
} from "@/lib/utils/formUtils";
import { BarChart } from "@/components/charts/Bar";

interface FieldAnalysisListProps {
  fieldBlocks: FormBlock[];
  submissionCount: number;
  responses: FormFieldResponseValue[];
}

interface SummaryMetrics {
  totalFields: number;
  totalResponses: number;
}

interface ChoiceBasedData {
  label: string;
  value: string;
  count: number;
  percentage: string;
}

type TextBasedData = string | number;

type FieldAnalysisChartData = ChoiceBasedData[] | TextBasedData[];

interface FieldAnalysisResult {
  blockType: FormBlockType;
  data: FieldAnalysisChartData;
}

function formatValue(value: TextBasedData | null): string {
  if (value === null || value === undefined) return "(Empty)";
  return String(value);
}

function analyzeField(field: FieldData): FieldAnalysisResult {
  const blockType = field.blockType;
  const values = field.responses.filter((v) => v !== null && v !== undefined);

  if (isChoiceBasedFieldBlock(blockType)) {
    const valueCounts: Record<string, number> = {};

    values.forEach((value) => {
      if (blockType === "checkbox" && Array.isArray(value)) {
        value.forEach((option) => {
          valueCounts[option] = (valueCounts[option] || 0) + 1;
        });
      } else {
        const key = String(value);
        valueCounts[key] = (valueCounts[key] || 0) + 1;
      }
    });

    let allOptions =
      field.options?.map((option) => ({ label: option, value: option })) ?? [];

    if (blockType === "checkbox" && allOptions.length === 0) {
      allOptions = [
        { label: "True", value: "true" },
        { label: "False", value: "false" },
      ];
    }

    const sortedValues = allOptions
      .map((option) => ({
        label: option.label,
        value: option.value,
        count: valueCounts[option.value] || 0,
        percentage:
          field.responses.length > 0
            ? (
                ((valueCounts[option.value] || 0) / field.responses.length) *
                100
              ).toFixed(1)
            : "0.0",
      }))
      .sort((a, b) => b.count - a.count);

    return { blockType, data: sortedValues };
  }

  return {
    blockType,
    data: values as TextBasedData[],
  };
}

export function FieldAnalysisList({
  fieldBlocks,
  submissionCount,
  responses,
}: FieldAnalysisListProps) {
  const { summaryMetrics, fieldAnalysis } = useMemo(() => {
    const fields: FieldData[] = fieldBlocks.map((block) => {
      const required =
        block.props?.required === true || block.props?.required === "true";
      const options = (block.props?.options ?? []) as string[];
      const blockResponses = responses.filter(
        (response) => response.blockId === block.id && response.value !== null,
      );

      const field: FieldData = {
        blockId: block.id,
        blockName: block.name,
        blockType: block.type,
        label: getFieldBlockLabel(block),
        required,
        responses: blockResponses.map((response) => response.value),
        responded: 0,
        skipped: submissionCount - blockResponses.length,
        options,
      };

      field.responded = field.responses.reduce<number>((sum, value) => {
        return sum + (Array.isArray(value) ? value.length : 1);
      }, 0);

      return field;
    });

    const summary: SummaryMetrics = {
      totalFields: fields.length,
      totalResponses: fields.reduce((sum, field) => sum + field.responded, 0),
    };

    return {
      summaryMetrics: summary,
      fieldAnalysis: fields,
    };
  }, [fieldBlocks, responses, submissionCount]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Metric
              label="Total Fields"
              value={String(summaryMetrics.totalFields)}
            />
            <Metric
              label="Total Responses"
              value={String(summaryMetrics.totalResponses)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 px-6">
          {fieldAnalysis.length === 0 ? (
            <Text className="text-muted-foreground">
              No input fields on this form.
            </Text>
          ) : (
            fieldAnalysis.map((field, index, arr) => {
              const isLast = index === arr.length - 1;
              const analysis = analyzeField(field);

              return (
                <div
                  className={`space-y-6 ${!isLast && "border-b border-border pb-6"}`}
                  key={field.blockId}
                >
                  <div className="space-y-2">
                    <Text variant="h4" className="text-foreground">
                      {field.label}
                    </Text>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge
                        label={field.blockType}
                        variant="neutral"
                        size="sm"
                      />
                      <Badge
                        label={field.required ? "Required" : "Optional"}
                        variant={field.required ? "success" : "neutral"}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="space-y-1 flex gap-2">
                        <Metric
                          className="flex-1"
                          value={field.responded}
                          label="Responses"
                        />
                        <Metric
                          className="flex-1"
                          value={field.skipped}
                          label="Skipped"
                        />
                      </div>

                      <div className="space-y-1">
                        <BarChart
                          value={field.responded}
                          maxValue={field.responded + field.skipped}
                          size="lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Text
                        variant="p"
                        className="text-sm font-medium text-foreground"
                      >
                        Responses
                      </Text>

                      {isChoiceBasedFieldBlock(analysis.blockType) && (
                        <div className="space-y-3 p-3 bg-muted/30 rounded border border-border">
                          {(analysis.data as ChoiceBasedData[]).map(
                            (item, itemIndex) => (
                              <div key={itemIndex} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <Text className="font-medium text-foreground text-sm">
                                    {item.label}
                                  </Text>
                                  <Badge
                                    label={`${item.count} (${item.percentage}%)`}
                                    variant="neutral"
                                    size="sm"
                                  />
                                </div>

                                <BarChart
                                  value={item.count}
                                  maxValue={field.responses.length}
                                  size="sm"
                                />
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {isTextBasedFieldBlock(analysis.blockType) && (
                        <>
                          {analysis.data.length > 0 ? (
                            <ul className="space-y-2 max-h-48 overflow-y-auto rounded border border-border">
                              {(analysis.data as TextBasedData[]).map(
                                (value, valueIndex) => (
                                  <li
                                    key={valueIndex}
                                    className="py-1 px-2 bg-white even:bg-gray-100"
                                  >
                                    <Text className="text-xs text-foreground">
                                      {formatValue(value)}
                                    </Text>
                                  </li>
                                ),
                              )}
                            </ul>
                          ) : (
                            <div className="p-4 rounded border border-border">
                              No response recorded
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import {
  Table,
  type TableColumn,
  type TableData,
  type TableRow,
} from "@/components/ui/Table";
import { type FormSubmission } from "@/lib/types/form";
import Text from "@/components/ui/Text";

interface SubmissionsListProps {
  submissions: FormSubmission[];
}

type SubmissionsTableRow = TableRow & {
  submissionId: string;
};

export function SubmissionsList({ submissions }: SubmissionsListProps) {
  const tableData = useMemo<TableData<SubmissionsTableRow>>(() => {
    const fieldMap = new Map<string, string>();

    for (const submission of submissions) {
      for (const response of submission.responses) {
        if (fieldMap.has(response.blockId)) continue;
        fieldMap.set(
          response.blockId,
          String(response.blockProps?.label || response.blockName),
        );
      }
    }

    const fieldColumns: TableColumn[] = Array.from(fieldMap.entries()).map(
      ([blockId, label]) => ({
        id: blockId,
        label,
        sortable: true,
      }),
    );

    const columns: TableColumn[] = [
      {
        id: "submissionId",
        label: "ID",
        sticky: true,
        sortable: false,
      },
      ...fieldColumns,
    ];

    const rows: SubmissionsTableRow[] = submissions.map((submission) => {
      const row: SubmissionsTableRow = {
        submissionId: submission.id,
      };

      for (const response of submission.responses) {
        row[response.blockId] = response.value;
      }

      return row;
    });

    return { columns, rows };
  }, [submissions]);

  return (
    <>
      <Text variant="h4" className="text-foreground mb-4">
        All Submissions
      </Text>
      <Table data={tableData} rowKey="submissionId" />
    </>
  );
}

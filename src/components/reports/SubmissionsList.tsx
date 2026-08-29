"use client";

import { useMemo } from "react";
import {
  Table,
  type TableColumn,
  type TableData,
  type TableRow,
} from "@/components/ui/Table";
import { type FormBlock, type FormSubmission } from "@/lib/types/form";
import { getFieldBlockLabel } from "@/lib/utils/formUtils";
import Text from "@/components/ui/Text";

interface SubmissionsListProps {
  fieldBlocks: FormBlock[];
  submissions: FormSubmission[];
}

type SubmissionsTableRow = TableRow & {
  submissionId: string;
};

export function SubmissionsList({
  fieldBlocks,
  submissions,
}: SubmissionsListProps) {
  const tableData = useMemo<TableData<SubmissionsTableRow>>(() => {
    const fieldColumns: TableColumn[] = fieldBlocks.map((block) => ({
      id: block.id,
      label: getFieldBlockLabel(block),
      sortable: true,
    }));

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
      const responsesByBlockId = new Map(
        submission.responses.map((response) => [
          response.blockId,
          response.value,
        ]),
      );

      const row: SubmissionsTableRow = {
        submissionId: submission.id,
      };

      for (const block of fieldBlocks) {
        row[block.id] = responsesByBlockId.get(block.id) ?? undefined;
      }

      return row;
    });

    return { columns, rows };
  }, [fieldBlocks, submissions]);

  return (
    <>
      <Text variant="h4" className="text-foreground mb-4">
        All Submissions
      </Text>
      <Table data={tableData} rowKey="submissionId" />
    </>
  );
}

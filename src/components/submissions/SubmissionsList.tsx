"use client";

import { useMemo, useState } from "react";
import {
  Table,
  type TableColumn,
  type TableData,
  type TableRow,
} from "@/components/ui/Table";
import {
  AppModal,
  AppModalContent,
  AppModalDescription,
  AppModalHeader,
  AppModalTitle,
} from "@/design-system/app/AppModal";
import { type FormBlock } from "@/lib/types/form";
import { type FormSubmissionListItem } from "@/lib/types/analytics";
import { getFieldBlockLabel } from "@/lib/utils/formUtils";
import { SubmissionDetail } from "@/components/submissions/SubmissionDetail";

interface SubmissionsListProps {
  fieldBlocks: FormBlock[];
  submissions: FormSubmissionListItem[];
}

type SubmissionsTableRow = TableRow & {
  submissionId: string;
};

export function SubmissionsList({
  fieldBlocks,
  submissions,
}: SubmissionsListProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<FormSubmissionListItem | null>(null);

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
      <Table
        data={tableData}
        rowKey="submissionId"
        onRowClick={(row) => {
          const submission = submissions.find(
            (item) => item.id === row.submissionId,
          );
          setSelectedSubmission(submission ?? null);
        }}
      />
      <AppModal
        open={selectedSubmission !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSubmission(null);
          }
        }}
      >
        <AppModalContent size="md">
          <AppModalHeader>
            <AppModalTitle>Submission</AppModalTitle>
            {selectedSubmission && (
              <AppModalDescription>
                {selectedSubmission.id} ·{" "}
                {new Date(selectedSubmission.submittedAt).toLocaleString()}
              </AppModalDescription>
            )}
          </AppModalHeader>
          {selectedSubmission && (
            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
              <SubmissionDetail
                fieldBlocks={fieldBlocks}
                submission={selectedSubmission}
              />
            </div>
          )}
        </AppModalContent>
      </AppModal>
    </>
  );
}

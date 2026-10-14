"use client";

import { useMemo, useState } from "react";
import {
  AppTable,
  type AppTableColumn,
  type AppTableData,
  type AppTableRow,
} from "@/design-system/app/AppTable";
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

type SubmissionsTableRow = AppTableRow & {
  submissionId: string;
};

export function SubmissionsList({
  fieldBlocks,
  submissions,
}: SubmissionsListProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<FormSubmissionListItem | null>(null);

  const tableData = useMemo<AppTableData<SubmissionsTableRow>>(() => {
    const fieldColumns: AppTableColumn[] = fieldBlocks.map((block) => ({
      id: block.id,
      label: getFieldBlockLabel(block),
      sortable: true,
    }));

    const columns: AppTableColumn[] = [
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
      <AppTable
        data={tableData}
        rowKey="submissionId"
        isRowClickable={true}
        onRowClick={(row) =>
          setSelectedSubmission(
            submissions.find(
              (submission) => submission.id === row.submissionId,
            ) ?? null,
          )
        }
      />
      <AppModal
        open={selectedSubmission !== null}
        onOpenChange={(open) =>
          setSelectedSubmission(open ? selectedSubmission : null)
        }
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

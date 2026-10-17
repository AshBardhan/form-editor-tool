"use client";

import { AppTable, type AppTableData } from "@/design-system/app/AppTable";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

const TABLE_DATA: AppTableData<{
  id: string;
  form: string;
  status: string;
  submissions: number;
  owner: string;
}> = {
  columns: [
    { id: "form", label: "Form", sticky: true, sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "submissions", label: "Submissions", sortable: true },
    { id: "owner", label: "Owner" },
  ],
  rows: [
    {
      id: "1",
      form: "Customer feedback",
      status: "Published",
      submissions: 128,
      owner: "Alex",
    },
    {
      id: "2",
      form: "Job application",
      status: "Draft",
      submissions: 0,
      owner: "Jordan",
    },
    {
      id: "3",
      form: "Event RSVP",
      status: "Published",
      submissions: 42,
      owner: "Sam",
    },
  ],
};

export function AppTableDemo() {
  return (
    <DemoSection
      scope="app"
      title="Table"
      description="Sortable data table with sticky first column and optional row click"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Sortable">
          <AppTable data={TABLE_DATA} />
        </DemoBlock>

        <DemoBlock scope="app" title="Empty">
          <AppTable
            data={{ columns: TABLE_DATA.columns, rows: [] }}
            emptyMessage="No forms to display"
          />
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

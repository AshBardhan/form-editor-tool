"use client";

import { Table } from "@/components/ui/Table";

const tableData = {
  columns: [
    {
      id: "submissionId",
      label: "Submission ID",
      sticky: true,
      sortable: false,
    },
    {
      id: "fld_name",
      label: "Name",
      sortable: true,
    },
    {
      id: "fld_age",
      label: "Age",
      sortable: true,
    },
    {
      id: "fld_city",
      label: "City",
      sortable: true,
    },
    {
      id: "fld_subscribed",
      label: "Subscribed",
      sortable: true,
    },
    {
      id: "fld_tags",
      label: "Tags",
      sortable: true,
    },
  ],
  rows: [
    {
      submissionId: "res_001",
      fld_name: "John",
      fld_age: 30,
      fld_city: "New York",
      fld_subscribed: true,
      fld_tags: ["new", "vip"],
    },
    {
      submissionId: "res_002",
      fld_name: "Jane",
      fld_age: 25,
      fld_city: "Austin",
      fld_subscribed: false,
      fld_tags: ["beta"],
    },
    {
      submissionId: "res_003",
      fld_name: "Carlos",
      fld_age: 33,
      fld_city: "Seattle",
      fld_subscribed: true,
      fld_tags: ["returning", "pro"],
    },
    {
      submissionId: "res_004",
      fld_name: "Aisha",
      fld_age: 28,
      fld_city: "Chicago",
      fld_subscribed: false,
      fld_tags: [],
    },
  ],
};

export function TableDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-3">Table Component</h2>
        <p className="text-lg text-muted-foreground">
          Generic data table with column-level sticky and sortable controls.
        </p>
      </div>

      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Form Submissions Example
          </h3>
          <p className="text-muted-foreground">
            Sticky first column for submission IDs and sortable field columns.
            Click a sortable header to cycle default, ascending, and descending.
          </p>
        </div>

        <Table data={tableData} rowKey="submissionId" />
      </section>

      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Code Example</h3>
          <p className="text-muted-foreground">
            A minimal example showing sticky and sortable column configuration.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <pre className="overflow-x-auto text-sm leading-6">
            <code>{`import { Table } from "@/components/ui/Table";

const data = {
  columns: [
    {
      id: "submissionId",
      label: "Submission ID",
      sticky: true,
      sortable: false,
    },
    {
      id: "fld_name",
      label: "Name",
      sortable: true,
    },
  ],
  rows: [
    {
      submissionId: "res_001",
      fld_name: "John",
    },
  ],
};

<Table data={data} rowKey="submissionId" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props Documentation</h3>
          <p className="text-muted-foreground">
            Table behavior is driven entirely by the data payload and row key.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Prop</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Default</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 font-mono text-xs">
                  DataTable&lt;Row&gt;
                </td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3">
                  Table content including columns and rows.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">rowKey</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">"id"</td>
                <td className="px-4 py-3">
                  Row property used as the React key and sticky first-column
                  value.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">
                  columns[].sticky
                </td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
                <td className="px-4 py-3">
                  Makes a column stick to the left while horizontally scrolling.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">
                  columns[].sortable
                </td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
                <td className="px-4 py-3">
                  Enables local sort cycling for the column.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">columns[].label</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3">Header text shown for the column.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

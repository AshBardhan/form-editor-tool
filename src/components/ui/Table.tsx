"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/styleUtils";

export type CellValue = string | number | boolean | null | undefined | string[];

export interface TableColumn {
  id: string;
  label: string;
  sticky?: boolean;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export type TableRow = Record<string, CellValue>;

export interface TableData<TRow extends TableRow> {
  columns: TableColumn[];
  rows: TRow[];
}

export type SortDirection = "asc" | "desc" | null;

export interface SortKey {
  id: string | null;
  direction: SortDirection;
}

interface TableProps<TRow extends TableRow> {
  data: TableData<TRow>;
  className?: string;
  emptyMessage?: string;
  /** Key of the row object used as the React key. Defaults to "id". */
  rowKey?: keyof TRow & string;
}

function getNextDirection(currentDirection: SortDirection) {
  if (currentDirection === null) return "asc";
  if (currentDirection === "asc") return "desc";
  return null;
}

function normalizeValue(value: CellValue): string | number {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "number") return value;
  return value.toLowerCase();
}

function formatValue(value: CellValue): string {
  if (value === null || value === undefined) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function Table<TRow extends TableRow>({
  data,
  className,
  emptyMessage = "No data available",
  rowKey = "id" as keyof TRow & string,
}: TableProps<TRow>) {
  const [sortKey, setSortKey] = useState<SortKey>({
    id: null,
    direction: null,
  });

  const sortedRows = useMemo(() => {
    if (!sortKey.id || !sortKey.direction) {
      return data.rows;
    }

    const column = data.columns.find((c) => c.id === sortKey.id);

    if (!column?.sortable) {
      return data.rows;
    }

    const directionFactor = sortKey.direction === "asc" ? 1 : -1;

    return [...data.rows].sort((a, b) => {
      const aValue = normalizeValue(a[column.id]);
      const bValue = normalizeValue(b[column.id]);

      if (aValue < bValue) return -1 * directionFactor;
      if (aValue > bValue) return 1 * directionFactor;
      return 0;
    });
  }, [sortKey, data.columns, data.rows]);

  const isActiveSortColumn = (column: TableColumn) => {
    return sortKey.id === column.id;
  };

  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    const isActive = isActiveSortColumn(column);
    const nextState: SortKey = {
      id: column.id,
      direction: isActive ? getNextDirection(sortKey.direction) : null,
    };

    setSortKey(nextState);
  };

  const getSortLabel = (column: TableColumn) => {
    const isActive = isActiveSortColumn(column);
    if (!isActive) return "";

    switch (sortKey.direction) {
      case "asc":
        return "↑";
      case "desc":
        return "↓";
      default:
        return "";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {data.columns.map((column) => {
                const sortLabel = getSortLabel(column);

                return (
                  <th
                    key={column.id}
                    className={cn(
                      "border-b border-border bg-gray-400 px-4 py-3 text-left font-semibold text-white whitespace-nowrap",
                      column.sticky &&
                        "sticky left-0 z-20 border-r border-border",
                      column.headerClassName,
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2"
                        onClick={() => handleSort(column)}
                      >
                        <span>{column.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {sortLabel}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedRows.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-muted-foreground"
                  colSpan={data.columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedRows.map((row, index) => {
                const key = String(
                  (row[rowKey] as string | undefined) ?? index,
                );

                return (
                  <tr key={key} className="bg-white even:bg-gray-100">
                    {data.columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          "border-b border-border px-4 py-3 text-foreground whitespace-nowrap",
                          column.sticky &&
                            "sticky left-0 z-10 border-r border-border bg-inherit font-medium",
                          column.className,
                        )}
                      >
                        {formatValue(row[column.id])}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

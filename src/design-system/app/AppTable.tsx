"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/styleUtils";

export type CellValue = string | number | boolean | null | undefined | string[];

export interface AppTableColumn {
  id: string;
  label: string;
  sticky?: boolean;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export type AppTableRow = Record<string, CellValue>;

export interface AppTableData<TRow extends AppTableRow> {
  columns: AppTableColumn[];
  rows: TRow[];
}

export type SortDirection = "asc" | "desc" | null;

export interface SortKey {
  id: string | null;
  direction: SortDirection;
}

interface AppTableProps<TRow extends AppTableRow> {
  data: AppTableData<TRow>;
  className?: string;
  emptyMessage?: string;
  /** Key of the row object used as the React key. Defaults to "id". */
  rowKey?: keyof TRow & string;
  isRowClickable?: boolean;
  onRowClick?: (row: TRow) => void;
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

export function AppTable<TRow extends AppTableRow>({
  data,
  className,
  emptyMessage = "No data available",
  rowKey = "id" as keyof TRow & string,
  isRowClickable = false,
  onRowClick = () => {},
}: AppTableProps<TRow>) {
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

  const isActiveSortColumn = (column: AppTableColumn) => {
    return sortKey.id === column.id;
  };

  const handleSort = (column: AppTableColumn) => {
    if (!column.sortable) return;

    const isActive = isActiveSortColumn(column);
    const nextState: SortKey = {
      id: column.id,
      direction: isActive ? getNextDirection(sortKey.direction) : "asc",
    };

    setSortKey(nextState);
  };

  const getSortLabel = (column: AppTableColumn) => {
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

  const getAriaSortLabel = (column: AppTableColumn) => {
    const isActive = isActiveSortColumn(column);
    if (!isActive) return "none";

    switch (sortKey.direction) {
      case "asc":
        return "ascending";
      case "desc":
        return "descending";
      default:
        return "none";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-x-auto rounded-lg border border-app-border-subtle">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {data.columns.map((column) => {
                const sortLabel = getSortLabel(column);

                return (
                  <th
                    scope="col"
                    key={column.id}
                    aria-sort={getAriaSortLabel(column)}
                    aria-label={`Sort by ${column.label}`}
                    className={cn(
                      "border-b border-app-border-subtle bg-app-field-placeholder text-app-field/80 px-4 py-3 text-left font-semibold whitespace-nowrap",
                      column.sticky &&
                        "sticky left-0 z-20 border-r border-app-border-subtle",
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
                        <span
                          className="text-xs text-app-field/80 hover:text-app-field"
                          aria-hidden="true"
                        >
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
                  className="px-4 py-3 text-center text-app-fg-muted"
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
                  <tr
                    key={key}
                    className={cn(
                      "bg-app-surface even:bg-app-surface-muted",
                      isRowClickable &&
                        "cursor-pointer hover:bg-app-surface-strong",
                    )}
                    onClick={() => isRowClickable && onRowClick(row)}
                    onKeyDown={(event) => {
                      if (
                        isRowClickable &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        onRowClick(row);
                      }
                    }}
                    tabIndex={isRowClickable ? 0 : undefined}
                    role={isRowClickable ? "link" : undefined}
                  >
                    {data.columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          "border-b border-app-border-subtle px-4 py-3 text-app-fg whitespace-nowrap",
                          column.sticky &&
                            "sticky left-0 z-10 border-r border-app-border-subtle bg-inherit font-medium",
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

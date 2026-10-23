"use client";

import { cn } from "@/lib/utils/styleUtils";
import { Widget } from "@/lib/types/widget";
import { useDraggable } from "@dnd-kit/core";
import { JSX, memo } from "react";

interface WidgetItemProps {
  widget: Widget;
}

/**
 * Widget Item (Draggable Component)
 *
 * @param {WidgetItemProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const WidgetItem = memo(function WidgetItem({
  widget,
}: WidgetItemProps): JSX.Element {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: widget.type,
    data: { ...widget, from: "sidebar" },
  });
  const Icon = widget.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      role="button"
      data-slot="widget-item"
      className={cn(
        "p-2 rounded-md flex items-center gap-2 cursor-move",
        "border border-app-border-subtle bg-app-surface text-app-sidebar-fg",
        "hover:bg-app-surface-muted hover:border-app-border-strong",
        "focus-visible:border-app-border-strong focus-visible:bg-app-border-strong focus-visible:shadow-none! focus-visible:outline-none!",
        "transition-all",
      )}
    >
      {Icon && (
        <div className="p-1 border border-app-sidebar-border rounded inline-flex">
          <Icon size={12} />
        </div>
      )}
      <span className="text-xs font-medium">{widget.label}</span>
    </div>
  );
});

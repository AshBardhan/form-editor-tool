"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeftIcon, PanelLeft, PanelRight } from "lucide-react";
import { JSX } from "react";
import { useFormDataStore, useUIStateStore } from "@/lib/stores";
import { cn } from "@/lib/utils/styleUtils";
import Link from "next/link";

/**
 * Form Builder Header
 * - Controls the toggling of left/right sidebars
 * - Render buttons for previewing and publishing the form.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const FormBuilderHeader = (): JSX.Element => {
  const formTitle = useFormDataStore((state) => state.form.title);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const toggleSidebar = useUIStateStore((state) => state.toggleSidebar);
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;

  return (
    <div className="flex items-center h-full">
      {/* Toggle collapse/expand Sidebar Control */}
      <div className="shrink-0 w-50 flex items-center gap-2">
        <Button variant="ghost" asChild className="hover:bg-[#1f1f1f]">
          <Link href="/">
            <ChevronLeftIcon size={20} />
          </Link>
        </Button>
        <Button
          variant="ghost"
          title={`${isLeftCollapsed ? "Expand" : "Collapse"} Left Sidebar`}
          onClick={() => toggleSidebar("left")}
          className={cn(
            !isLeftCollapsed && "bg-[#2e2e2e]",
            "hover:bg-[#1f1f1f]",
          )}
        >
          <PanelLeft size={20} />
        </Button>
        <Button
          variant="ghost"
          title={`${isRightCollapsed ? "Expand" : "Collapse"} Right Sidebar`}
          onClick={() => toggleSidebar("right")}
          className={cn(
            !isRightCollapsed && "bg-[#2e2e2e]",
            "hover:bg-[#1f1f1f]",
          )}
        >
          <PanelRight size={20} />
        </Button>
      </div>
      {/* Form Title */}
      <h1 className="flex-1 font-semibold text-center text-xl">{formTitle}</h1>
      {/* Action Buttons - Just for display purpose. Not functional yet... */}
      <div className="shrink-0 w-50 flex items-center justify-end gap-2">
        <Button variant="secondary" size="sm">
          Preview
        </Button>
        <Button variant="default" size="sm">
          Publish
        </Button>
      </div>
    </div>
  );
};

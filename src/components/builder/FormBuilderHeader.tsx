"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PanelLeft, PanelRight } from "lucide-react";
import { JSX } from "react";
import { useFormDataStore, useUIStateStore } from "@/lib/stores";

/**
 * Form Builder Header
 * - Controls the toggling of left/right sidebars
 * - Render buttons for previewing and publishing the form.
 *
 * @returns {JSX.Element} The rendered component.
 */
const FormBuilderHeader = (): JSX.Element => {
  const form = useFormDataStore((state) => state.form);
  const isSidebarCollapsed = useUIStateStore(
    (state) => state.isSidebarCollapsed,
  );
  const toggleSidebar = useUIStateStore((state) => state.toggleSidebar);
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;

  return (
    <>
      {/* Toggle collapse/expand Sidebar Control */}
      <div className="flex-shrink-0 w-50 flex items-center gap-2">
        <Button
          variant="ghost"
          title={`${isLeftCollapsed ? "Expand" : "Collapse"} Left Sidebar`}
          onClick={() => toggleSidebar("left")}
          className={`${!isLeftCollapsed && "bg-[#2e2e2e]"} hover:bg-[#1f1f1f]`}
        >
          <PanelLeft size={20} />
        </Button>
        <Button
          variant="ghost"
          title={`${isRightCollapsed ? "Expand" : "Collapse"} Right Sidebar`}
          onClick={() => toggleSidebar("right")}
          className={`${!isRightCollapsed && "bg-[#2e2e2e]"} hover:bg-[#1f1f1f]`}
        >
          <PanelRight size={20} />
        </Button>
      </div>
      {/* Form Title */}
      <h1 className="flex-1 font-semibold text-center text-xl">{form.title}</h1>
      {/* Action Buttons - Just for display purpose. Not functional yet... */}
      <div className="flex-shrink-0 w-50 flex items-center justify-end gap-2">
        <Button variant="secondary" size="sm">
          Preview
        </Button>
        <Link href="/builder" className="hover:underline">
          <Button variant="default" size="sm">
            Publish
          </Button>
        </Link>
      </div>
    </>
  );
};

export { FormBuilderHeader };

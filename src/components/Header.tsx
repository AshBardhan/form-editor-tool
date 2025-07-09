"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PanelLeft, PanelRight } from "lucide-react";
import { useFormStore } from "@/lib/store";

const Header = () => {
  const { form, isSidebarCollapsed, toggleSidebar } = useFormStore();
  const isLeftCollapsed = isSidebarCollapsed.left;
  const isRightCollapsed = isSidebarCollapsed.right;

  return (
    <header className="flex flex-shrink-0 items-center text-white h-16 px-4 bg-[#151515] border-b border-[#2f2f2f]">
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
      <h1 className="flex-1 font-semibold text-center text-xl">{form.title}</h1>
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
    </header>
  );
};

export { Header };

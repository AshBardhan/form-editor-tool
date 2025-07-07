"use client";

import { componentPalette } from "@/lib/constants/componentPalette";
import { DraggableCard } from "./DraggableCard";
import { ChevronDown } from "lucide-react";

const ComponentSidebar = () => {
  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold">Form Fields</h2>
      </div>
      {componentPalette.map((group) => (
        <div
          className="p-4 border-b border-b-[#2d2d2d] flex flex-col gap-3"
          key={group.category}
        >
          <div className="flex items-center justify-between h-10">
            <h3 className="text-sm font-semibold">{group.label}</h3>
            <ChevronDown size={20} className="text-current" />
          </div>
          <div className="flex flex-col gap-3">
            {group.items.map((comp) => (
              <DraggableCard key={comp.type} component={comp} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export { ComponentSidebar };

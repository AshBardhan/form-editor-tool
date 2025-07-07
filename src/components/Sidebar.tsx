"use client";

import { componentPalette } from "@/lib/constants/componentPalette";
import { DraggableCard } from "./DraggableCard";

const Sidebar = () => {
  return (
    <>
      <div className="flex items-center justify-between text-black p-4 border-b border-black/5 h-16">
        <h2 className="font-semibold">Form Fields</h2>
      </div>
      <div className="p-4">
        {componentPalette.map((c) => (
          <DraggableCard key={c.type} component={c} />
        ))}
      </div>
    </>
  );
};

export { Sidebar };

"use client";

import { newComponentPalette } from "@/lib/constants/componentPalette";
import { DraggableCard } from "./DraggableCard";

const ComponentSidebar = () => {
  return (
    <>
      <div className="flex items-center justify-between text-black p-4 border-b border-black/5 h-16">
        <h2 className="font-semibold">Form Fields</h2>
      </div>
      <div className="px-4">
        {newComponentPalette.map((group) => (
          <div className="mb-6" key={group.category}>
            <h3 className="text-sm font-bold">{group.label}</h3>
            <div className="space-y-2 mt-2">
              {group.items.map((comp) => (
                <DraggableCard key={comp.type} component={comp} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { ComponentSidebar };

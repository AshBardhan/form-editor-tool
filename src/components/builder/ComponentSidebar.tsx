"use client";

import { componentPalette } from "@/lib/constants/componentPalette";
import { DraggableCard } from "./DraggableCard";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ComponentSidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [category: string]: boolean;
  }>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <div className="p-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold">Form Fields</h2>
      </div>

      {componentPalette.map((group) => {
        const isOpen = expandedCategories[group.category] ?? true;

        return (
          <div
            key={group.category}
            data-slot="component-category"
            className="border-b border-b-[#2d2d2d] p-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-sm font-semibold">{group.label}</h3>
              <div
                role="button"
                onClick={() => toggleCategory(group.category)}
                className="p-2 cursor-pointer"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    isOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
            </div>

            {isOpen && (
              <div className="flex flex-col gap-3">
                {group.items.map((comp) => (
                  <DraggableCard key={comp.type} component={comp} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export { ComponentSidebar };

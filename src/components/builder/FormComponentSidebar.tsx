"use client";

import { componentPalette } from "@/lib/constants/componentPalette";
import { DraggableComponent } from "./DraggableComponent";
import { ChevronDown, ComponentIcon, SearchIcon } from "lucide-react";
import { useState, useMemo, JSX } from "react";
import { Input } from "@/components/ui/Input";
import { Component } from "@/types/component";

/**
 * Form Component Sidebar
 * - Provides a left sidebar with a list of form components.
 * - Allows users to search and select components to add to a form.
 *
 * @returns {JSX.Element} The rendered component.
 */
const FormComponentSidebar = (): JSX.Element => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [category: string]: boolean;
  }>({});

  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Toggles the expansion state of a category in the sidebar.
   *
   * @param {string} category - The category to toggle.
   */
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  /**
   * Filters components based on the search query.
   *
   * @returns {Component[]} The filtered list of components.
   */
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const matchedItems: Component[] = [];

    for (const group of componentPalette) {
      const categoryMatch = group.label.toLowerCase().includes(query);

      if (categoryMatch) {
        // Include all items if the category matches
        matchedItems.push(...group.items);
      } else {
        // Otherwise include individual components that match
        const matchedInGroup = group.items.filter((item) =>
          item.label.toLowerCase().includes(query),
        );
        matchedItems.push(...matchedInGroup);
      }
    }

    return matchedItems;
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Sidebar Header */}
      <div className="p-4 flex flex-col gap-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold flex items-center gap-2">
          <ComponentIcon size={20} />
          Form Components
        </h2>
        {/* Search Bar */}
        <div className="relative dark">
          <Input
            type="text"
            name="search"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full focus-visible:ring-0 focus-visible:!shadow-none"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filtered Results of Ungrouped Components */}
      {isSearching ? (
        <div className="p-4">
          {filteredComponents.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredComponents.map((comp) => (
                <DraggableComponent key={comp.type} component={comp} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-center pt-4">No components found</div>
          )}
        </div>
      ) : (
        <>
          {/* Grouped Components */}
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
                      className={`transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}
                    />
                  </div>
                </div>
                {isOpen && (
                  <div className="grid grid-cols-2 gap-3">
                    {group.items.map((comp) => (
                      <DraggableComponent key={comp.type} component={comp} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export { FormComponentSidebar };

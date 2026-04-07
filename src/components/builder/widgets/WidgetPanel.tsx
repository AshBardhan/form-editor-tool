"use client";

import { widgetPalette } from "@/lib/constants/widgetPalette";
import { WidgetItem } from "./WidgetItem";
import { ChevronDown, ComponentIcon, SearchIcon } from "lucide-react";
import { useState, useMemo, useCallback, useEffect, JSX, memo } from "react";
import { Input } from "@/components/ui/Input";
import { Widget } from "@/lib/types/widget";
import { AnimatePresence, motion } from "motion/react";
import { collapsibleContentVariants } from "@/lib/constants/styles";
import { cn } from "@/lib/utils/styleUtils";

/**
 * Widget Panel (Left Sidebar)
 * - Provides a left sidebar with a list of form widgets.
 * - Allows users to search and select widgets to add to a form.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const WidgetPanel = memo(function WidgetPanel(): JSX.Element {
  const [expandedCategories, setExpandedCategories] = useState<{
    [category: string]: boolean;
  }>({});

  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Toggles the expansion state of a category in the sidebar.
   *
   * @param {string} category - The category to toggle.
   */
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  /**
   * Filters widgets based on the search query.
   *
   * @returns {Widget[]} The filtered list of widgets.
   */
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const matchedItems: Widget[] = [];

    for (const group of widgetPalette) {
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

  /**
   * Sets default categories as expanded when the component mounts.
   */
  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    for (const group of widgetPalette) {
      defaults[group.category] = true;
    }
    setExpandedCategories(defaults);
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Sidebar Header */}
      <div className="p-4 flex flex-col gap-4 border-b border-b-[#2d2d2d]">
        <h2 className="font-semibold flex items-center gap-2">
          <ComponentIcon size={20} />
          Form Widgets
        </h2>
        {/* Search Bar */}
        <div className="relative dark">
          <Input
            type="text"
            name="search"
            placeholder="Search Widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full focus-visible:ring-0 focus-visible:shadow-none!"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filtered Results of Ungrouped Widgets */}
      {isSearching ? (
        <div className="p-4">
          {filteredComponents.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredComponents.map((widget) => (
                <WidgetItem key={widget.type} widget={widget} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-center pt-4">No widgets found</div>
          )}
        </div>
      ) : (
        <>
          {/* Grouped Widgets */}
          {widgetPalette.map((group) => {
            const isOpen = expandedCategories[group.category];

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
                      className={cn(
                        "transition-transform rotate-180",
                        isOpen && "rotate-0",
                      )}
                    />
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="category-content"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={collapsibleContentVariants}
                      className="overflow-hidden grid grid-cols-2 gap-3"
                    >
                      {group.items.map((widget) => (
                        <WidgetItem key={widget.type} widget={widget} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </>
      )}
    </>
  );
});

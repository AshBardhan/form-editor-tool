"use client";

import { useDraggable } from "@dnd-kit/core";

interface ComponentType {
  type: string;
  label: string;
}

const components: ComponentType[] = [
  { type: "input", label: "Text Input" },
  { type: "checkbox", label: "Checkbox" },
];

const Sidebar = () => {
  return (
    <>
      <div className="flex items-center justify-between text-black p-4 border-b border-black/5 h-16">
        <h2 className="font-semibold">Form Fields</h2>
      </div>
      <div className="p-4">
        {components.map((c) => (
          <DraggableCard key={c.type} component={c} />
        ))}
      </div>
    </>
  );
};

export { Sidebar };

function DraggableCard({ component }: { component: ComponentType }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.type,
    data: component,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 mb-2 border border-white rounded shadow-sm cursor-move bg-gray-300"
    >
      {component.label}
    </div>
  );
}

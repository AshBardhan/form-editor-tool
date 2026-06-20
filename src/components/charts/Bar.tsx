interface BarChartProps {
  value: number;
  maxValue: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

function BarChart({ value, maxValue, size = "md", label }: BarChartProps) {
  const height = size === "sm" ? "h-2" : size === "lg" ? "h-6" : "h-4";

  return (
    <div className="flex items-center space-x-2">
      <div className={`relative w-full bg-gray-200 rounded ${height}`}>
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </div>
  );
}

export { BarChart };

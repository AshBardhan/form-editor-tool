import { FormListItem } from "@/lib/types/form";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Metric from "@/components/ui/Metric";
import { Badge } from "@/components/ui/Badge";

interface FormCardProps {
  form: FormListItem;
}

/**
 * FormCard - Individual form tile with basic info
 * Displays form name and provides link to edit
 * Future: Add metrics (widget count, submission count)
 */
export function FormCard({ form }: FormCardProps) {
  const statusVariant = form.status === "published" ? "success" : "warning";
  const statusLabel = form.status === "published" ? "Published" : "Draft";

  return (
    <Link href={`/forms/${form.id}`} className="block group">
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full relative">
        <Badge
          label={statusLabel}
          variant={statusVariant}
          size="sm"
          className="absolute top-3 right-3"
        />
        <CardContent className="px-6 space-y-2">
          <Text
            variant="h4"
            className="truncate group-hover:text-primary transition-colors"
          >
            {form.name}
          </Text>
          <div className="flex gap-8">
            {form.metrics.map((metric) => (
              <Metric
                key={metric.key}
                direction="column"
                label={metric.label}
                reverse={true}
                value={metric.value}
                size="sm"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

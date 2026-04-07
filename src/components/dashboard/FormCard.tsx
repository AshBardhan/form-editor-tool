import { FormListItem } from "@/types/form-field";
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
  return (
    <Link href={`/forms/${form.id}`} className="block group">
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full relative">
        <Badge 
          label="Draft" 
          variant="warning" 
          size="sm" 
          className="absolute top-3 right-3"
        />
        <CardContent className="px-6 space-y-2">
            <Text variant="h4" className="truncate group-hover:text-primary transition-colors">
              {form.name}
            </Text>
            <div className="flex gap-8">
              <Metric
                direction="column"
                label="Fields"
                reverse={true}
                value={12}
                size="sm"
              />
              <Metric
                direction="column"
                label="Submissions"
                reverse={true}
                value={245}
                size="sm"
              />
              <Metric
                direction="column"
                label="Completion"
                reverse={true}
                value="66.7%"
                size="sm"
              />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}

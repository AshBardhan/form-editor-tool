import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Separator } from "@/components/ui/Separator";

interface SeparatorFieldProps {
  field: FormField;
}

const SeparatorField = ({ field }: SeparatorFieldProps) => {
  const spacing = Number(getPropValue(field, "spacing") ?? 20);
  const divider = Boolean(getPropValue(field, "divider"));

  return (
    <div style={{ paddingTop: spacing, paddingBottom: spacing }}>
      {divider && <Separator />}
    </div>
  );
};

export { SeparatorField };

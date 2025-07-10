import { FormField } from "@/types/field";
import { Button } from "@/components/ui/Button";
import { getPropValue } from "@/lib/utils/fieldUtils";
import { cn } from "@/lib/utils";

interface ButtonFieldProps {
  field: FormField;
}

const BUTTON_VARIANT_MAP: Record<string, "default" | "secondary"> = {
  Primary: "default",
  Secondary: "secondary",
};

const POSITION_CLASS_MAP: Record<string, string> = {
  Left: "justify-start",
  Center: "justify-center",
  Right: "justify-end",
};

const ButtonField = ({ field }: ButtonFieldProps) => {
  const title = getPropValue(field, "title") ?? "Button";
  const levelRaw = getPropValue(field, "level") ?? "Primary";
  const positionRaw = getPropValue(field, "position") ?? "Left";

  const level = BUTTON_VARIANT_MAP[levelRaw] || "default";
  const alignmentClass = POSITION_CLASS_MAP[positionRaw] || "justify-start";

  return (
    <div className={cn("flex", alignmentClass)}>
      <Button variant={level}>{title}</Button>
    </div>
  );
};

export { ButtonField };

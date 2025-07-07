import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

export const InputField = ({ field }: { field: Field }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id} className="font-semibold">
          {getPropValue(field, "label")}
        </Label>
      )}
      <Input
        id={field.id}
        type={field.type}
        placeholder={String(getPropValue(field, "placeholder"))}
        disabled
      />
    </div>
  );
};

import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";

export const TextField = ({ field }: { field: Field }) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      {getPropValue(field, "label") && (
        <label className="block mb-1 font-medium">
          {getPropValue(field, "label")}
        </label>
      )}
      <input
        type="text"
        placeholder={String(getPropValue(field, "placeholder"))}
        disabled
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
};

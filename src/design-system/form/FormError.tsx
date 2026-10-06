import { cn } from "@/lib/utils/styleUtils";
import { FormText } from "@/design-system/form/FormText";

export type FormErrorProps = {
  errors?: string[];
  id?: string;
  className?: string;
};

export function FormError({ errors = [], id, className }: FormErrorProps) {
  if (errors.length === 0) return null;

  return (
    <div
      id={id}
      role="alert"
      data-slot="form-error"
      className={cn("flex flex-col gap-1", className)}
    >
      {errors.length === 1 ? (
        <FormText
          variant="p"
          className="text-form-error text-xs @sm:text-xs @5xl:text-sm"
        >
          {errors[0]}
        </FormText>
      ) : (
        <ul className="flex flex-col gap-1">
          {errors.map((error, index) => (
            <li key={`${error}-${index}`}>
              <FormText
                variant="span"
                className="text-form-error text-xs @sm:text-xs @5xl:text-sm"
              >
                {error}
              </FormText>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

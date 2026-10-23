import { FormText } from "@/design-system/form/FormText";
import { TEXT_VARIANTS } from "@/design-system/primitives";
import { DemoSection } from "@/components/demos/DemoSection";
import { TEXT_SAMPLES } from "@/components/demos/constants";

export function FormTextDemo() {
  return (
    <DemoSection
      scope="form"
      title="Text"
      description="Container-responsive type. Sizes step up at @sm and @5xl inside the form container."
    >
      <div className="flex flex-col gap-3">
        {TEXT_VARIANTS.map((variant) => (
          <FormText key={variant} variant={variant}>
            {TEXT_SAMPLES[variant]}
          </FormText>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="@container w-64 rounded-md border border-form-border-subtle p-3">
          <FormText variant="h2">Narrow container</FormText>
          <FormText variant="p">
            This box is below the @sm container breakpoint.
          </FormText>
        </div>
        <div className="@container w-full rounded-md border border-form-border-subtle p-3">
          <FormText variant="h2">Wide container</FormText>
          <FormText variant="p">
            This box uses the form column width, so it steps up once the column
            reaches @sm.
          </FormText>
        </div>
      </div>
    </DemoSection>
  );
}

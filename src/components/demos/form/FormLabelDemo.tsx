import { FormLabel } from "@/design-system/form/FormLabel";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormLabelDemo() {
  return (
    <DemoSection
      scope="form"
      title="Label"
      description="Field label with medium and large sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Sizes">
          <div className="flex flex-col gap-3">
            <FormLabel size="md" htmlFor="form-label-md">
              Medium label
            </FormLabel>
            <FormLabel size="lg" htmlFor="form-label-lg">
              Large label
            </FormLabel>
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="States">
          <div className="flex flex-col gap-3">
            <FormLabel size="md" required htmlFor="form-label-required">
              Required
            </FormLabel>
            <FormLabel size="md" aria-invalid htmlFor="form-label-invalid">
              Invalid
            </FormLabel>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

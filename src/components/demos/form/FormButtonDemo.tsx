import { FormButton } from "@/design-system/form/FormButton";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormButtonDemo() {
  return (
    <DemoSection
      scope="form"
      title="Button"
      description="Form-specific button component"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Variants">
          <div className="flex items-center gap-2 flex-wrap">
            <FormButton variant="solid" color="primary">
              Solid
            </FormButton>
            <FormButton variant="outline" color="primary">
              Outline
            </FormButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Colors">
          <div className="flex items-center gap-2 flex-wrap">
            <FormButton variant="solid" color="primary">
              Primary
            </FormButton>
            <FormButton variant="solid" color="secondary">
              Secondary
            </FormButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
          <div className="flex items-center gap-2 flex-wrap">
            <FormButton variant="solid" color="primary" size="md">
              Medium
            </FormButton>
            <FormButton variant="solid" color="primary" size="lg">
              Large
            </FormButton>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

import { FormTextArea } from "@/design-system/form/FormTextArea";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormTextAreaDemo() {
  return (
    <DemoSection
      scope="form"
      title="TextArea"
      description="Multi-line text input"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="States">
          <div className="flex flex-col gap-2">
            <FormTextArea placeholder="Default state" />
            <FormTextArea placeholder="Disabled" disabled />
            <FormTextArea placeholder="Invalid" aria-invalid />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

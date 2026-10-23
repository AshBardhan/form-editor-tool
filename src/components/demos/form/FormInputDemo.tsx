import { FormInput } from "@/design-system/form/FormInput";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormInputDemo() {
  return (
    <DemoSection
      scope="form"
      title="Input"
      description="Text input with multiple types and medium and large sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Types">
          <div className="flex flex-col gap-2">
            <FormInput type="text" placeholder="Text" />
            <FormInput type="number" placeholder="Number" />
            <FormInput type="url" placeholder="URL" />
            <FormInput type="password" placeholder="Password" />
            <FormInput type="text" placeholder="Disabled" disabled />
            <FormInput type="email" placeholder="Invalid" aria-invalid />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Sizes">
          <div className="flex flex-col gap-2">
            <FormInput inputSize="md" type="text" placeholder="Medium" />
            <FormInput inputSize="lg" type="text" placeholder="Large" />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

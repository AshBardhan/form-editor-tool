import { AppInput } from "@/design-system/app/AppInput";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppInputDemo() {
  return (
    <DemoSection
      scope="app"
      title="Input"
      description="Text input with multiple types and sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Types">
          <div className="flex flex-col gap-2">
            <AppInput type="text" placeholder="Text" />
            <AppInput type="number" placeholder="Number" />
            <AppInput type="url" placeholder="URL" />
            <AppInput type="password" placeholder="Password" />
            <AppInput type="text" placeholder="Disabled" disabled />
            <AppInput type="email" placeholder="Invalid" aria-invalid />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
          <div className="flex flex-col gap-2">
            <AppInput inputSize="sm" type="text" placeholder="Small" />
            <AppInput inputSize="md" type="text" placeholder="Medium" />
            <AppInput inputSize="lg" type="text" placeholder="Large" />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

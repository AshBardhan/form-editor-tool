import { AppTextArea } from "@/design-system/app/AppTextArea";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppTextAreaDemo() {
  return (
    <DemoSection
      scope="app"
      title="TextArea"
      description="Multi-line text input"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="States">
          <div className="flex flex-col gap-2">
            <AppTextArea placeholder="Default state" />
            <AppTextArea placeholder="Disabled" disabled />
            <AppTextArea placeholder="Invalid" aria-invalid />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

import { AppLabel } from "@/design-system/app/AppLabel";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppLabelDemo() {
  return (
    <DemoSection
      scope="app"
      title="Label"
      description="Field label with small, medium, and large sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Sizes">
          <div className="flex flex-col gap-3">
            <AppLabel size="sm" htmlFor="app-label-sm">
              Small label
            </AppLabel>
            <AppLabel size="md" htmlFor="app-label-md">
              Medium label
            </AppLabel>
            <AppLabel size="lg" htmlFor="app-label-lg">
              Large label
            </AppLabel>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="States">
          <div className="flex flex-col gap-3">
            <AppLabel size="md" required htmlFor="app-label-required">
              Required
            </AppLabel>
            <AppLabel size="md" aria-invalid htmlFor="app-label-invalid">
              Invalid
            </AppLabel>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

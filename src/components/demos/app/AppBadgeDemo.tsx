import { AppBadge } from "@/design-system/app/AppBadge";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppBadgeDemo() {
  return (
    <DemoSection
      scope="app"
      title="Badge"
      description="Status pill with variants and sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Variants">
          <div className="flex items-center gap-2 flex-wrap">
            <AppBadge label="Success" variant="success" />
            <AppBadge label="Warning" variant="warning" />
            <AppBadge label="Error" variant="error" />
            <AppBadge label="Info" variant="info" />
            <AppBadge label="Neutral" variant="neutral" />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
          <div className="flex items-center gap-2 flex-wrap">
            <AppBadge label="Small" variant="info" size="sm" />
            <AppBadge label="Medium" variant="info" size="md" />
            <AppBadge label="Large" variant="info" size="lg" />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

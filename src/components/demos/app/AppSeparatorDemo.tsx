import { AppSeparator } from "@/design-system/app/AppSeparator";
import { AppText } from "@/design-system/app/AppText";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppSeparatorDemo() {
  return (
    <DemoSection
      scope="app"
      title="Separator"
      description="Horizontal or vertical divider for grouping related content"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Horizontal">
          <div className="flex flex-col gap-3">
            <AppText variant="p">Section above</AppText>
            <AppSeparator />
            <AppText variant="p">Section below</AppText>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Vertical">
          <div className="flex items-center gap-4 h-12">
            <AppText variant="span">Left</AppText>
            <AppSeparator orientation="vertical" className="h-full" />
            <AppText variant="span">Right</AppText>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

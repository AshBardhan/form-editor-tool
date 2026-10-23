import { AppBadge } from "@/design-system/app/AppBadge";
import { AppCard } from "@/design-system/app/AppCard";
import { AppMetric } from "@/design-system/app/AppMetric";
import { AppText } from "@/design-system/app/AppText";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppCardDemo() {
  return (
    <DemoSection
      scope="app"
      title="Card"
      description="Surface container with optional hover affordance"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Default">
          <AppCard className="space-y-2">
            <AppText variant="h5">Project Alpha</AppText>
            <AppText variant="p" className="text-app-fg-muted">
              Static card for grouping related content.
            </AppText>
          </AppCard>
        </DemoBlock>

        <DemoBlock scope="app" title="Clickable">
          <AppCard clickable className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <AppText variant="h5">Published form</AppText>
              <AppBadge label="Published" variant="success" size="sm" />
            </div>
            <AppMetric label="Submissions" value={128} size="sm" reverse />
          </AppCard>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

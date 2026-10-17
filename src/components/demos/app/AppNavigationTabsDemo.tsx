import { AppNavigationTabs } from "@/design-system/app/AppNavigationTabs";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppNavigationTabsDemo() {
  return (
    <DemoSection
      scope="app"
      title="Navigation Tabs"
      description="Route-aware tab list. Overview is active on this page."
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Active route">
          <AppNavigationTabs
            basePath=""
            items={[
              { label: "Overview", path: "demo" },
              { label: "Forms", path: "forms" },
              { label: "Admin", path: "admin" },
            ]}
          />
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

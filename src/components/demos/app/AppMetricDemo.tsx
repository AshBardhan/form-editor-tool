import { AppMetric } from "@/design-system/app/AppMetric";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppMetricDemo() {
  return (
    <DemoSection
      scope="app"
      title="Metric"
      description="Label and value pair for dashboard stats"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Sizes">
          <div className="flex items-start gap-6 flex-wrap">
            <AppMetric label="Views" value={1234} size="sm" />
            <AppMetric label="Submissions" value={342} size="md" />
            <AppMetric label="Conversion" value="3.2%" size="lg" />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Direction">
          <div className="flex items-start gap-6 flex-wrap">
            <AppMetric
              label="Total sales"
              value="$125,430"
              direction="column"
            />
            <AppMetric label="New orders" value={342} direction="row" />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Reverse">
          <div className="flex items-start gap-6 flex-wrap">
            <AppMetric label="Active sessions" value={573} reverse />
            <AppMetric label="Success rate" value="98.5%" reverse />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}

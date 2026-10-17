import { AppSkeleton } from "@/design-system/app/AppSkeleton";
import { DemoSection } from "@/components/demos/DemoSection";

export function AppSkeletonDemo() {
  return (
    <DemoSection
      scope="app"
      title="Skeleton"
      description="Loading state placeholder"
    >
      <div className="flex flex-col gap-2">
        <AppSkeleton width="70%" height={20} />
        <AppSkeleton width={100} height={10} />
        <AppSkeleton width={200} height={50} />
      </div>
    </DemoSection>
  );
}

import { PageContainer, PageContent, PageHeader } from "@/components/layout";
import { FormsHeader } from "@/components/dashboard";
import { AppCard } from "@/design-system/app/AppCard";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <PageHeader>
        <PageContainer>
          <FormsHeader />
        </PageContainer>
      </PageHeader>
      <PageContent>
        <PageContainer className="py-8">
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <AppCard key={i} className="h-full relative space-y-2">
                {/* Badge skeleton */}
                <Skeleton
                  className="absolute top-3 right-3"
                  width={60}
                  height={15}
                />

                {/* Title skeleton */}
                <Skeleton width="70%" height={20} />

                {/* Metrics skeletons */}
                <div className="flex gap-8 pt-2">
                  <div className="space-y-1">
                    <Skeleton width={40} height={20} />
                    <Skeleton width={60} height={10} />
                  </div>
                  <div className="space-y-1">
                    <Skeleton width={40} height={20} />
                    <Skeleton width={60} height={10} />
                  </div>
                  <div className="space-y-1">
                    <Skeleton width={40} height={20} />
                    <Skeleton width={60} height={10} />
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        </PageContainer>
      </PageContent>
    </>
  );
}

import { PageContainer } from "@/components/layout";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { RefreshPageButton } from "@/components/ui/RefreshPageButton";
import { AppText } from "@/design-system/app/AppText";

interface FormAnalyticsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function FormAnalyticsLayout({
  children,
  params,
}: FormAnalyticsLayoutProps) {
  const { slug } = await params;

  return (
    <PageContainer className="py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <AppText variant="h3" className="text-app-fg-primary">
            Analytics
          </AppText>
          <RefreshPageButton label="Refresh analytics" />
        </div>
        <NavigationTabs
          items={[
            { label: "Overview", path: "overview" },
            { label: "Fields", path: "fields" },
          ]}
          basePath={`/forms/${slug}/analytics`}
        />
        {children}
      </div>
    </PageContainer>
  );
}

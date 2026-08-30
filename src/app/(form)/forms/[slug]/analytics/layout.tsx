import { PageContainer } from "@/components/layout";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { RefreshPageButton } from "@/components/ui/RefreshPageButton";
import Text from "@/components/ui/Text";

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
          <Text variant="h3" className="text-foreground">
            Analytics
          </Text>
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

import {
  PageHeader,
  PageContent,
  PageContainer,
  AppHeader,
  AppContent,
} from "@/components/layout";
import { NavigationTabs } from "@/components/ui/NavigationTabs";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const formNavigationPaths = [
    {
      label: "Builder",
      path: "builder",
    },
    {
      label: "Reports",
      path: "reports",
      children: [
        {
          label: "Responses",
          path: "responses",
        },
        {
          label: "Fields",
          path: "fields",
        },
      ],
    },
  ];

  return (
    <>
      <AppHeader />
      <AppContent>
        <PageHeader className="pb-0">
          <PageContainer className="flex flex-col gap-4">
            <div className="text-2xl font-semibold">Form Page Header</div>
            <NavigationTabs
              items={formNavigationPaths}
              basePath={`/forms/${slug}`}
            />
          </PageContainer>
        </PageHeader>
        <PageContent>{children}</PageContent>
      </AppContent>
    </>
  );
}

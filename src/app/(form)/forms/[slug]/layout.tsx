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
    <div>
      <div className="bg-gray-200">
        <div className="flex flex-col max-w-7xl mx-auto py-4 px-6">
          <div className="text-2xl font-semibold">Form Page Header</div>
          <NavigationTabs
            items={formNavigationPaths}
            basePath={`/forms/${slug}`}
            className="mt-4"
          />
        </div>
      </div>
      {children}
    </div>
  );
}

import { PageContainer } from "@/components/layout";
import { RefreshPageButton } from "@/components/ui/RefreshPageButton";
import Text from "@/components/ui/Text";

interface FormSubmissionsLayoutProps {
  children: React.ReactNode;
}

export default function FormSubmissionsLayout({
  children,
}: FormSubmissionsLayoutProps) {
  return (
    <PageContainer className="py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Text variant="h3" className="text-foreground">
            Submissions
          </Text>
          <RefreshPageButton label="Refresh submissions" />
        </div>
        {children}
      </div>
    </PageContainer>
  );
}

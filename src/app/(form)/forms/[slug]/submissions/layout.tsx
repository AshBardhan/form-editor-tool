import { PageContainer } from "@/components/layout";
import { RefreshPageButton } from "@/components/ui/RefreshPageButton";
import { AppText } from "@/design-system/app/AppText";

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
          <AppText variant="h3" className="text-app-fg-primary">
            Submissions
          </AppText>
          <RefreshPageButton label="Refresh submissions" />
        </div>
        {children}
      </div>
    </PageContainer>
  );
}

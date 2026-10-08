import { PageContainer, PageContent, PageHeader } from "@/components/layout";
import { FormsHeader } from "@/components/dashboard";
import { AppText } from "@/design-system/app/AppText";

export default function NotFound() {
  return (
    <>
      <PageHeader>
        <PageContainer>
          <FormsHeader />
        </PageContainer>
      </PageHeader>
      <PageContent>
        <PageContainer className="py-8 h-full">
          <div className="empty-content flex-col gap-2">
            <AppText variant="h2">Unable to load forms</AppText>
            <AppText variant="p">Please try again later.</AppText>
          </div>
        </PageContainer>
      </PageContent>
    </>
  );
}

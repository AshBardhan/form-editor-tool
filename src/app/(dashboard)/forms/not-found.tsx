import { PageContainer, PageContent, PageHeader } from "@/components/layout";
import { FormsHeader } from "@/components/dashboard";

export default function NotFound() {
  return (
    <>
      <PageHeader>
        <PageContainer>
          <FormsHeader />
        </PageContainer>
      </PageHeader>
      <PageContent>
        <PageContainer className="py-8">
          <div className="empty-content flex-col gap-2">
            <h2 className="text-lg font-semibold">Unable to load forms</h2>
            <p className="text-sm">Please try again later.</p>
          </div>
        </PageContainer>
      </PageContent>
    </>
  );
}

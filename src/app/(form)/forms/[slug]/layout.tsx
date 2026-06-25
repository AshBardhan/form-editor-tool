import { PageHeader, PageContent, PageContainer } from "@/components/layout";
import { notFound } from "next/navigation";
import { FormHeader } from "@/components/form/FormHeader";
import { getFormPageData } from "@/lib/queries/forms";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Fetches the shared form shell data for the form area and renders the common header.
 * Validates form exists at parent level to prevent unnecessary child API calls.
 */
export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const form = await getFormPageData(slug);

  // If form doesn't exist, trigger not-found with proper 404 status
  if (!form) {
    notFound();
  }

  // Form exists, render normal layout with header
  return (
    <>
      <PageHeader className="pb-0">
        <PageContainer className="flex flex-col gap-4">
          <FormHeader form={form} />
        </PageContainer>
      </PageHeader>
      <PageContent>{children}</PageContent>
    </>
  );
}

import { PageHeader, PageContent, PageContainer } from "@/components/layout";
import { notFound } from "next/navigation";
import { FormHeader } from "@/components/form/FormHeader";
import { getFormMetaData } from "@/lib/queries/forms";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Fetches minimal form metadata for the header and validates form exists.
 * Child pages (builder, reports) fetch their own specific data as needed.
 */
export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const form = await getFormMetaData(slug);

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

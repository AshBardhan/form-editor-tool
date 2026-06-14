import {
  PageHeader,
  PageContent,
  PageContainer,
  AppHeader,
  AppContent,
} from "@/components/layout";
import { notFound } from "next/navigation";
import { FormHeader } from "@/components/form/FormHeader";
import { getFormPageData } from "@/lib/queries/forms";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Fetches the shared form shell data for the form area and renders the common header.
 */
export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const form = await getFormPageData(slug);

  if (!form || !form.slug) {
    notFound();
  }

  return (
    <>
      <AppHeader />
      <AppContent>
        <PageHeader className="pb-0">
          <PageContainer className="flex flex-col gap-4">
            <FormHeader form={form} />
          </PageContainer>
        </PageHeader>
        <PageContent>{children}</PageContent>
      </AppContent>
    </>
  );
}

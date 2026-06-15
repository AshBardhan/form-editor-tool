import { notFound } from "next/navigation";
import { PublicFormContent } from "@/components/public/PublicFormContent";
import { AppContent, PageContent } from "@/components/layout";
import { getPublicFormData } from "@/lib/queries/forms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicFormPage({ params }: PageProps) {
  const { slug } = await params;

  const form = await getPublicFormData(slug);

  if (!form) {
    notFound();
  }

  return (
    <AppContent>
      <PageContent>
        <PublicFormContent form={form} />
      </PageContent>
    </AppContent>
  );
}

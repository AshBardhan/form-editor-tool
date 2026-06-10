import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PublicFormContainer } from "@/components/public/PublicFormContainer";
import { AppContent, PageContent } from "@/components/layout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicFormPage({ params }: PageProps) {
  const { slug } = await params;

  const form = await prisma.form.findUnique({
    where: { slug, status: "published" },
    include: {
      blocks: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!form) {
    notFound();
  }

  return (
    <AppContent>
      <PageContent>
        <PublicFormContainer form={form} />
      </PageContent>
    </AppContent>
  );
}

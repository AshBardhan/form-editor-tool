import {
  PageHeader,
  PageContent,
  PageContainer,
  AppHeader,
  AppContent,
} from "@/components/layout";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FormHeader } from "@/components/form/FormHeader";
import { FormBlockType } from "@/lib/types/form";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const form = await prisma.form.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      theme: true,
      status: true,
      blocks: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          type: true,
          name: true,
          props: true,
        },
      },
    },
  });

  if (!form || !form.slug) {
    notFound();
  }

  const mappedForm = {
    id: form.id,
    slug: form.slug,
    title: form.title,
    description: form.description ?? undefined,
    theme: form.theme,
    status: form.status,
    blocks: form.blocks.map((block) => ({
      id: block.id,
      type: block.type as FormBlockType,
      name: block.name,
      props: block.props as Record<
        string,
        string | number | boolean | string[] | undefined
      >,
    })),
  };

  return (
    <>
      <AppHeader />
      <AppContent>
        <PageHeader className="pb-0">
          <PageContainer className="flex flex-col gap-4">
            <FormHeader form={mappedForm} />
          </PageContainer>
        </PageHeader>
        <PageContent>{children}</PageContent>
      </AppContent>
    </>
  );
}

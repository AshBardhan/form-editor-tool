import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PublicFormContainer } from "@/components/public/PublicFormContainer";
import { FormBlockType } from "@/lib/types/form";

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
    <PublicFormContainer
      form={{
        id: form.id,
        title: form.title,
        description: form.description,
        theme: form.theme,
        blocks: form.blocks.map((block) => ({
          id: block.id,
          type: block.type as FormBlockType,
          name: block.name,
          props: block.props as Record<
            string,
            string | number | boolean | string[] | undefined
          >,
        })),
      }}
    />
  );
}

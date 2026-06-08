import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FormConfig } from "@/lib/types/form";
import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;

  const form = (await prisma.form.findUnique({
    where: { slug },
    include: {
      blocks: {
        orderBy: { order: "asc" },
      },
    },
  })) as FormConfig | null;

  if (!form) {
    notFound();
  }

  return <FormBuilderContainer form={form} />;
}

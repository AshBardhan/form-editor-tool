import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FormConfig } from "@/lib/types/form";
import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";

interface FormPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormPage({ params }: FormPageProps) {
  const { id } = await params;

  const form = (await prisma.form.findUnique({
    where: { id },
    include: {
      blocks: true,
    },
  })) as FormConfig | null;

  if (!form) {
    notFound();
  }

  return <FormBuilderContainer form={form} />;
}

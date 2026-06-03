import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FormList } from "@/lib/types/form";
import { FormGrid } from "@/components/dashboard/FormGrid";
import { JSX } from "react";

export default async function FormsPage(): Promise<JSX.Element> {
  let forms = null;
  let error = false;
  try {
    forms = await prisma.form.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        _count: { select: { blocks: true, submissions: true } },
      },
    });
  } catch (e) {
    error = true;
  }
  if (error || !forms) return notFound();

  // Map to FormListItem[]
  const formList: FormList = forms.map((form) => ({
    id: form.id,
    title: form.title,
    status: form.status,
    metrics: {
      blocks: form._count.blocks,
      submissions: form._count.submissions,
    },
  }));

  return <FormGrid forms={formList} />;
}

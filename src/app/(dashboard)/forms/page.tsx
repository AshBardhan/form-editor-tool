import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DashboardForm } from "@/lib/types/form";
import { FormList } from "@/components/dashboard/FormList";
import { JSX } from "react";

export default async function FormsPage(): Promise<JSX.Element> {
  let forms = null;
  let error = false;
  try {
    forms = await prisma.form.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        _count: { select: { blocks: true, submissions: true } },
      },
    });
  } catch (_) {
    error = true;
  }
  if (error || !forms) return notFound();

  const dashboardFormsList: DashboardForm[] = forms.map((form) => ({
    id: form.id,
    slug: form.slug,
    title: form.title,
    status: form.status,
    metrics: {
      blocks: form._count.blocks,
      submissions: form._count.submissions,
    },
  }));

  return <FormList forms={dashboardFormsList} />;
}

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DashboardForm, FormBlockType } from "@/lib/types/form";
import { isFieldBasedBlock } from "@/lib/utils/formUtils";
import { FormsDashboard } from "@/components/dashboard/FormsDashboard";
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
        views: true,
        blocks: {
          select: { id: true, type: true },
        },
        _count: { select: { submissions: true } },
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
      fields: form.blocks.filter(
        (block) => block.type && isFieldBasedBlock(block.type as FormBlockType),
      ).length,
      views: form.views,
      submissions: form._count.submissions,
    },
  }));

  return <FormsDashboard forms={dashboardFormsList} />;
}

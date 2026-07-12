import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { DashboardForm, FormBlockType } from "@/lib/types/form";
import { isFieldBasedBlock } from "@/lib/utils/formUtils";
import { FormsDashboard } from "@/components/dashboard/FormsDashboard";
import { auth } from "@/lib/auth";
import { JSX } from "react";

export default async function FormsPage(): Promise<JSX.Element> {
  // Require authentication
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  const userId = parseInt(session.user.id);
  const isAdmin = session.user.role === "ADMIN";

  let forms = null;
  let error = false;
  try {
    forms = await prisma.form.findMany({
      where: isAdmin ? undefined : { userId }, // ADMIN sees all, CLIENT sees only own
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

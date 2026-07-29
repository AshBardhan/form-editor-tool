import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { DashboardForm, FormBlockType } from "@/lib/types/form";
import { isFieldBasedBlock } from "@/lib/utils/formUtils";
import { FormsDashboard } from "@/components/dashboard/FormsDashboard";
import { auth } from "@/auth";
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
      where: isAdmin ? undefined : { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        views: true,
        createdAt: true,
        publishedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
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
    isAdmin,
    createdBy: isAdmin ? form.user.name || form.user.email : undefined,
    createdAt: form.createdAt.toISOString(),
    publishedAt: form.publishedAt?.toISOString() || null,
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

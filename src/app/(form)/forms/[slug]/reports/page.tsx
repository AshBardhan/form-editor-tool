import { redirect } from "next/navigation";

export default async function FormReportsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  redirect(`/forms/${slug}/reports/submissions`);
}

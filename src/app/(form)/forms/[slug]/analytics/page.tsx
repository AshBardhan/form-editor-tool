import { redirect } from "next/navigation";

export default async function FormAnalyticsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  redirect(`/forms/${slug}/analytics/overview`);
}

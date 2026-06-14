import { notFound } from "next/navigation";
import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { getFormPageData } from "@/lib/queries/forms";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Loads the builder payload for a form and mounts the client-side builder container.
 */
export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;

  const form = await getFormPageData(slug);

  if (!form) {
    notFound();
  }

  return <FormBuilderContainer form={form} />;
}

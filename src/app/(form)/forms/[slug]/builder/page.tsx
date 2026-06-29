import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { getFormBuilderData } from "@/lib/queries/forms";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Loads the builder payload for a form and mounts the client-side builder container.
 * Parent layout already validates form exists, so we can safely fetch data here.
 */
export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;

  const form = await getFormBuilderData(slug);

  return <FormBuilderContainer form={form!} />;
}

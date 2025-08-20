import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { JSX } from "react";

interface BuilderPageProps {
  params: Promise<{ formId: string }>;
}

/**
 * Current Form Builder Page
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default async function BuilderPage({
  params,
}: BuilderPageProps): Promise<JSX.Element> {
  const { formId } = await params;
  return <FormBuilderContainer id={formId} />;
}

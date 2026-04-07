import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { JSX } from "react";

interface FormPageProps {
  params: Promise<{ formId: string }>;
}

/**
 * Edit Form Builder Page
 * Route: /forms/:formId
 * Edits an existing form with prefilled builder
 *
 * @param {Object} props - Props object containing the route parameters.
 * @returns {JSX.Element} The rendered page component.
 */
export default async function FormPage({
  params,
}: FormPageProps): Promise<JSX.Element> {
  const { formId } = await params;
  return <FormBuilderContainer id={formId} />;
}

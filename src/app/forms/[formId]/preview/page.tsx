import { FormPreviewContainer } from "@/components/preview/FormPreviewContainer";
import { JSX } from "react";

interface FormPreviewPageProps {
  params: Promise<{ formId: string }>;
}

/**
 * Form Preview Page
 * Route: /forms/:formId/preview
 * Displays the assembled form in preview mode
 *
 * @param {Object} props - Props object containing the route parameters.
 * @returns {JSX.Element} The rendered page component.
 */
export default async function FormPreviewPage({
  params,
}: FormPreviewPageProps): Promise<JSX.Element> {
  const { formId } = await params;
  return <FormPreviewContainer id={formId} />;
}

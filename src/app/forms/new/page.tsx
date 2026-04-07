import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { JSX } from "react";

/**
 * New Form Builder Page
 * Route: /forms/new
 * Creates a new form with an empty builder
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function NewFormPage(): JSX.Element {
  return <FormBuilderContainer />;
}

import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { FormConfig } from "@/lib/types/form";

/**
 * New Form Builder Page
 * Route: /forms/new
 * Creates a new form with empty builder
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function NewFormPage() {
  const emptyForm: FormConfig = {
    title: "Untitled Form",
    theme: "light",
    blocks: [],
  };

  return <FormBuilderContainer form={emptyForm} />;
}

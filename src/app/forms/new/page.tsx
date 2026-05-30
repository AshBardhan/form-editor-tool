import { FormBuilderContainer } from "@/components/builder/FormBuilderContainer";
import { FormConfig } from "@/lib/types/form";

const emptyForm: FormConfig = {
  title: "Untitled Form",
  theme: "light",
  blocks: [],
};

/**
 * New Form Builder Page
 * Route: /forms/new
 * Creates a new form with empty builder
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function NewFormPage() {
  return <FormBuilderContainer form={emptyForm} />;
}

import { JSX } from "react";
import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { Header } from "@/components/layout/Header";
import { PageContent } from "@/components/layout/PageContent";

/**
 * Builder Layout
 * - Provides a layout structure with a header and content area.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="page-container">
      <Header>
        <FormBuilderHeader />
      </Header>
      <PageContent>{children}</PageContent>
    </div>
  );
}

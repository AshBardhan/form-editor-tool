import { JSX } from "react";
import { FormsHeader } from "@/components/dashboard";
import {
  AppHeader,
  AppContent,
  PageHeader,
  PageContent,
  PageContainer,
} from "@/components/layout";

/**
 * Forms Dashboard Layout
 * - Provides a layout structure for the forms dashboard pages.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <AppHeader />
      <AppContent>
        <PageHeader>
          <PageContainer>
            <FormsHeader />
          </PageContainer>
        </PageHeader>
        <PageContent>
          <PageContainer className="py-8">{children}</PageContainer>
        </PageContent>
      </AppContent>
    </>
  );
}

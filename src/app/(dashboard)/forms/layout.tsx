import { JSX } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppContent } from "@/components/layout";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";

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
    <AppThemeContainer>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </AppThemeContainer>
  );
}

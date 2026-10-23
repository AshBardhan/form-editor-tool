import { AppHeader } from "@/components/layout/AppHeader";
import { AppContent } from "@/components/layout";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Fetches the shared form shell data for the form area and renders the common header.
 * Validates form exists at parent level to prevent unnecessary child API calls.
 */
export default function FormLayout({ children }: LayoutProps) {
  return (
    <AppThemeContainer>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </AppThemeContainer>
  );
}

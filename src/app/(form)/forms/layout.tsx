import { AppHeader, AppContent } from "@/components/layout";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Fetches the shared form shell data for the form area and renders the common header.
 * Validates form exists at parent level to prevent unnecessary child API calls.
 */
export default function FormLayout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </>
  );
}

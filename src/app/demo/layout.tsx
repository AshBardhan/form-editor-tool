import { AppHeader } from "@/components/layout/AppHeader";
import { AppContent } from "@/components/layout";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppThemeContainer>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </AppThemeContainer>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  AppContent,
  PageContainer,
  PageContent,
  PageHeader,
} from "@/components/layout";
import { AppThemeContainer } from "@/design-system/containers/AppThemeContainer";
import { AppNavigationTabs } from "@/design-system/app/AppNavigationTabs";
import { AppText } from "@/design-system/app/AppText";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavigationPaths = [
  { label: "Users", path: "users" },
  { label: "Forms", path: "forms" },
  { label: "Analytics", path: "analytics" },
  { label: "Settings", path: "settings" },
];

/**
 * Admin Layout
 * - Mirrors the form layout: common app header, page header with title and
 *   navigation tabs, and page content where admin sub-pages render.
 * - Restricts access to ADMIN users.
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  return (
    <AppThemeContainer>
      <AppHeader />
      <AppContent>
        <PageHeader className="pb-0">
          <PageContainer className="flex flex-col gap-4">
            <AppText variant="h1">Admin Panel</AppText>
            <AppNavigationTabs items={adminNavigationPaths} basePath="/admin" />
          </PageContainer>
        </PageHeader>
        <PageContent>
          <PageContainer className="py-8">{children}</PageContainer>
        </PageContent>
      </AppContent>
    </AppThemeContainer>
  );
}

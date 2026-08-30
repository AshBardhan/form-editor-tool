import { PageHeader, PageContent, PageContainer } from "@/components/layout";
import { notFound, redirect } from "next/navigation";
import { FormHeader } from "@/components/form/FormHeader";
import { getFormMetaData } from "@/lib/queries/forms";
import { auth } from "@/auth";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Fetches minimal form metadata for the header and validates form exists.
 * Child pages (builder, analytics, submissions) fetch their own specific data as needed.
 */
export default async function FormLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  // Require authentication
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  const userId = parseInt(session.user.id);
  const isAdmin = session.user.role === "ADMIN";

  const form = await getFormMetaData(slug);

  // If form doesn't exist, trigger not-found with proper 404 status
  if (!form) {
    notFound();
  }

  // Check ownership: CLIENT users can only access their own forms, ADMIN can access all

  if (!isAdmin && form.userId !== userId) {
    redirect("/forms"); // Redirect to dashboard if not authorized
  }

  // Form exists, render normal layout with header
  return (
    <>
      <PageHeader className="pb-0">
        <PageContainer className="flex flex-col gap-4">
          <FormHeader form={form} />
        </PageContainer>
      </PageHeader>
      <PageContent>{children}</PageContent>
    </>
  );
}

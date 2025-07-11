import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";
import { Header } from "@/components/layout/Header";
import { PageContent } from "@/components/layout/PageContent";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-container">
      <Header>
        <FormBuilderHeader />
      </Header>
      <PageContent>{children}</PageContent>
    </div>
  );
}

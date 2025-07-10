import { FormBuilderHeader } from "@/components/builder/FormBuilderHeader";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <FormBuilderHeader />
      {children}
    </div>
  );
}

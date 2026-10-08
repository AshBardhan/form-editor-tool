import { AppText } from "@/design-system/app/AppText";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <AppText variant="h1" className="mb-6">
          Database Connection Test
        </AppText>
        {children}
      </div>
    </div>
  );
}

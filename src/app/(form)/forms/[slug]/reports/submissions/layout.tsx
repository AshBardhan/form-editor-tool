import Text from "@/components/ui/Text";
import { RefreshReportsButton } from "@/components/reports";

interface SubmissionsLayoutProps {
  children: React.ReactNode;
}

export default function SubmissionsLayout({
  children,
}: SubmissionsLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <Text variant="h3" className="text-foreground">
          Form Submissions Report
        </Text>
        <RefreshReportsButton />
      </div>
      {children}
    </div>
  );
}

import Text from "@/components/ui/Text";
import { RefreshReportsButton } from "@/components/reports";

interface FieldsLayoutProps {
  children: React.ReactNode;
}

export default function FieldsLayout({ children }: FieldsLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <Text variant="h3" className="text-foreground">
          Field-by-Field Analysis Report
        </Text>
        <RefreshReportsButton />
      </div>
      {children}
    </div>
  );
}

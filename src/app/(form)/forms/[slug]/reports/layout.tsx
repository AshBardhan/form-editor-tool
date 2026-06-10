import { PageContainer } from "@/components/layout";

interface FormReportLayoutProps {
  children: React.ReactNode;
}

export default function FormReportsLayout({ children }: FormReportLayoutProps) {
  return <PageContainer className="py-8">{children}</PageContainer>;
}

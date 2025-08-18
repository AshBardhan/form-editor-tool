import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormKit - A Visual DnD Form Builder",
  description: "A visual drag and drop form builder created in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MswProvider } from "@/components/MswProvider";

export const metadata: Metadata = {
  title: "FormKit - A Visual DnD Form Builder",
  description: "A visual drag and drop form builder created in Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MswProvider>{children}</MswProvider>
      </body>
    </html>
  );
}

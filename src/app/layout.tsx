import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/Toast";

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
        <div id="app">
          {children}
          <Toaster position="bottom-center" />
        </div>
      </body>
    </html>
  );
}

import "./globals.css";

import type { Metadata, Viewport } from "next";
import { AppToastProvider } from "@/design-system/app/AppToast";
import { APP_THEME_STORAGE_KEY } from "@/lib/stores/UIStateStore";
import { DEFAULT_APP_THEME } from "@/lib/constants/themes";

const appThemeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(APP_THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark")t=${JSON.stringify(DEFAULT_APP_THEME)};document.documentElement.dataset.appTheme=t;}catch(e){}})();`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: appThemeScript }} />
      </head>
      <body suppressHydrationWarning>
        <AppToastProvider>{children}</AppToastProvider>
      </body>
    </html>
  );
}

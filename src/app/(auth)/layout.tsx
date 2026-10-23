/**
 * Auth Layout
 * Two-column shell for sign-in / sign-up: shared copy + form card.
 */

import Link from "next/link";
import { AppText } from "@/design-system/app/AppText";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Stacks on mobile; two columns from md up */}
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-10">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-heading"
          >
            FormKit
          </Link>
          <AppText className="mt-8 font-medium tracking-wide text-app-brand uppercase">
            Visual form editor
          </AppText>
          <AppText variant="h1" className="mt-3 tracking-tight">
            Design forms by dragging blocks, then publish them in minutes
          </AppText>
          <AppText
            variant="p"
            className="mt-4 leading-relaxed text-app-fg-muted"
          >
            Sign in to build on a canvas, preview across devices, and collect
            responses with submissions and analytics in one place.
          </AppText>
        </div>

        <div className="w-full max-w-md justify-self-center md:justify-self-end">
          {children}
        </div>
      </div>
    </div>
  );
}

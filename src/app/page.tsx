/**
 * Landing page
 * Public home at `/` — no session redirects; CTAs go to `/signin`.
 */

import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

const highlights = [
  {
    title: "Drag-and-drop builder",
    description:
      "Assemble forms from configurable widgets and reorder blocks until the layout feels right.",
  },
  {
    title: "Publish and collect",
    description:
      "Share a public link, capture responses, and keep drafts, published, and archived forms in one place.",
  },
  {
    title: "See what people answer",
    description:
      "Review submissions, funnel metrics, and field-level analytics without leaving the editor.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-y-auto bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <AppText className="text-xl">FormKit</AppText>

        <Link href="/signin">
          <AppButton variant="outline" color="secondary">
            Sign in
          </AppButton>
        </Link>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-10 text-center sm:px-10 sm:pt-16">
        <AppText
          variant="p"
          className="mb-4 text-sm font-medium tracking-wide text-app-brand uppercase"
        >
          Visual form editor
        </AppText>
        <AppText variant="h1" className="max-w-3xl tracking-tight">
          Design forms by dragging blocks, then publish them in minutes
        </AppText>
        <AppText
          variant="p"
          className="mt-5 max-w-2xl leading-relaxed text-app-fg-muted"
        >
          FormKit is a Next.js form builder for teams that want a canvas, a live
          preview, and a public share link — plus submissions and analytics once
          responses start coming in.
        </AppText>
        <div className="mt-8">
          <Link href="/signin">
            <AppButton variant="solid" color="primary" size="lg">
              Get started
            </AppButton>
          </Link>
        </div>

        <ul className="mt-16 grid w-full gap-4 text-left sm:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/80 bg-white/80 p-6 shadow-sm"
            >
              <AppText variant="h3">{item.title}</AppText>
              <AppText
                variant="p"
                className="mt-2 text-sm leading-relaxed text-app-fg-muted"
              >
                {item.description}
              </AppText>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

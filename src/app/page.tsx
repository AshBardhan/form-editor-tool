/**
 * Landing page
 * Public home at `/` — no session redirects; CTAs go to `/signin`.
 */

import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";

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
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <AppText className="text-xl">FormKit</AppText>
        <AppButton
          render={<Link href="/signin" />}
          variant="outline"
          color="secondary"
        >
          Sign in
        </AppButton>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-10 text-center sm:px-10 sm:pt-16">
        <AppText className="mb-4 text-sm font-medium tracking-wide text-app-brand uppercase">
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
          <AppButton
            render={<Link href="/signin" />}
            variant="solid"
            color="primary"
            size="lg"
          >
            Get started
          </AppButton>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {highlights.map((item) => (
            <AppCard className="text-left" key={item.title}>
              <AppText variant="h4">{item.title}</AppText>
              <AppText
                variant="p"
                className="mt-2 text-sm leading-relaxed text-app-fg-muted"
              >
                {item.description}
              </AppText>
            </AppCard>
          ))}
        </div>
      </main>
    </div>
  );
}

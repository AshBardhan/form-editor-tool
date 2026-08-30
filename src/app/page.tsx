/**
 * Landing page
 * Public home at `/` — no session redirects; CTAs go to `/signin`.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
        <p className="text-xl font-bold text-gray-900">FormKit</p>
        <Button asChild variant="outline">
          {/* Header CTA */}
          <Link href="/signin">Sign in</Link>
        </Button>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-10 text-center sm:px-10 sm:pt-16">
        <p className="mb-4 text-sm font-medium tracking-wide text-primary uppercase">
          Visual form editor
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          Design forms by dragging blocks, then publish them in minutes
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-paragraph sm:text-lg">
          FormKit is a Next.js form builder for teams that want a canvas, a
          live preview, and a public share link — plus submissions and
          analytics once responses start coming in.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            {/* Primary CTA */}
            <Link href="/signin">Get started</Link>
          </Button>
        </div>

        <ul className="mt-16 grid w-full gap-4 text-left sm:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/80 bg-white/80 p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-heading">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paragraph">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

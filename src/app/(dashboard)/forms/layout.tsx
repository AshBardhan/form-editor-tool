import { JSX } from "react";
import { FormsHeader } from "@/components/dashboard";

/**
 * Forms Dashboard Layout
 * - Provides a layout structure for the forms dashboard pages.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className="max-w-7xl mx-auto py-8 px-6">
      <FormsHeader />
      {children}
    </main>
  );
}

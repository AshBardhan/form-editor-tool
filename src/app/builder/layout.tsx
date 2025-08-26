import { JSX } from "react";

/**
 * Builder Layout
 * - Provides a layout structure for the builder page.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <div className="page-container">{children}</div>;
}

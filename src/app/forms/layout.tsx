import { JSX } from "react";

/**
 * Forms Layout
 * - Provides a layout structure for the forms pages.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <div className="page-container">{children}</div>;
}

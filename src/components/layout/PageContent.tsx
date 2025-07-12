import { JSX } from "react";

interface PageContentProps {
  children: React.ReactNode;
}

/**
 * Page Content Layout
 * - Wraps the provided children within a main element.
 *
 * @param {PageContentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const PageContent = ({ children }: PageContentProps): JSX.Element => {
  return <main className="page-content">{children}</main>;
};

export { PageContent };

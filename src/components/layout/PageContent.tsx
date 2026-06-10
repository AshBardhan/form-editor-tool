import { JSX } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface PageContentProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Page Content Layout
 * - Wraps the provided children within a main element.
 *
 * @param {PageContentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const PageContent = ({
  className,
  children,
}: PageContentProps): JSX.Element => {
  return <main className={cn("page-content", className)}>{children}</main>;
};

export { PageContent };

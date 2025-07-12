import { JSX } from "react";

interface HeaderProps {
  children: React.ReactNode;
}

/**
 * Header Layout
 * - Wraps the provided children within a header element.
 *
 * @param {HeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Header = ({ children }: HeaderProps): JSX.Element => {
  return <header className="page-header">{children}</header>;
};

export { Header };

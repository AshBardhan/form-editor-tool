import { JSX } from "react";

interface SidebarProps {
  position?: "left" | "right";
  children: React.ReactNode;
}

/**
 * Sidebar Layout
 * - Displays the sidebar on the left or right side of the page.
 *
 * @param {SidebarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Sidebar = ({
  position = "left",
  children,
}: SidebarProps): JSX.Element => {
  return <aside className={`sidebar sidebar--${position}`}>{children}</aside>;
};

export { Sidebar };

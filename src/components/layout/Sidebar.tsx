import { JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sidebarStyleVariants } from "@/lib/constants/styles";
import { cn } from "@/lib/utils/styleUtils";

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
  return (
    <motion.aside
      key={`sidebar-${position}`}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarStyleVariants.parent}
      className={cn("sidebar", `sidebar--${position}`)}
    >
      <AnimatePresence propagate>
        <motion.div
          key="sidebar-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarStyleVariants.child}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
};

export { Sidebar };

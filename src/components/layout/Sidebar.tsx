import { JSX } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const slidingTime = 0.2;
const contentVisibilityTime = 0.2;

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
  const sidebarStyleVariants: Record<string, Variants> = {
    parent: {
      hidden: {
        width: 0,
        transition: {
          duration: slidingTime,
          ease: "easeInOut",
          delay: contentVisibilityTime,
        },
      },
      visible: {
        width: "18rem",
        transition: { duration: slidingTime, ease: "easeInOut" },
      },
      exit: {
        width: 0,
        transition: {
          duration: slidingTime,
          ease: "easeInOut",
          delay: contentVisibilityTime,
        },
      },
    },
    child: {
      hidden: {
        opacity: 0,
        transition: { duration: contentVisibilityTime, ease: "easeInOut" },
      },
      visible: {
        opacity: 1,
        transition: {
          duration: contentVisibilityTime,
          ease: "easeInOut",
          delay: slidingTime,
        },
      },
      exit: {
        opacity: 0,
        transition: { duration: contentVisibilityTime, ease: "easeInOut" },
      },
    },
  };

  return (
    <motion.aside
      key={`sidebar-${position}`}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarStyleVariants.parent}
      className={`sidebar sidebar--${position}`}
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

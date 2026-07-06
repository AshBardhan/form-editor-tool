import { motion } from "motion/react";
import { JSX } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface MainContentProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Main Content Layout
 * - Wraps the provided children within a section element.
 *
 * @param {MainContentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const MainContent = ({
  className,
  children,
}: MainContentProps): JSX.Element => {
  return (
    <motion.section
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("main-content", className)}
    >
      {children}
    </motion.section>
  );
};

export { MainContent };

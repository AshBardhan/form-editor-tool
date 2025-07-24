import { Variants } from "motion";

const slideContentTime = 0.2;
const showContentTime = 0.2;
const hideContentTime = 0.15;

export const sidebarStyleVariants: Record<string, Variants> = {
  parent: {
    hidden: {
      width: 0,
      transition: {
        duration: slideContentTime,
        ease: "easeInOut",
        delay: hideContentTime,
      },
    },
    visible: {
      width: "18rem",
      transition: { duration: slideContentTime, ease: "easeInOut" },
    },
    exit: {
      width: 0,
      transition: {
        duration: slideContentTime,
        ease: "easeInOut",
        delay: hideContentTime,
      },
    },
  },
  child: {
    hidden: {
      opacity: 0,
      visibility: "hidden",
      transition: { duration: hideContentTime, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      visibility: "visible",
      transition: {
        duration: showContentTime,
        ease: "easeInOut",
        delay: slideContentTime,
      },
    },
    exit: {
      opacity: 0,
      visibility: "hidden",
      transition: { duration: hideContentTime, ease: "easeInOut" },
    },
  },
};

export const collapsibleContentVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    visibility: "hidden",
    transition: { duration: hideContentTime, ease: "easeInOut" },
  },
  visible: {
    height: "auto",
    opacity: 1,
    visibility: "visible",
    transition: { duration: showContentTime, ease: "easeInOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    visibility: "hidden",
    transition: { duration: hideContentTime, ease: "easeInOut" },
  },
};

export const visibleContentVariants: Variants = {
  hidden: {
    opacity: 0,
    visibility: "hidden",
    transition: { duration: hideContentTime, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    visibility: "visible",
    transition: { duration: showContentTime, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    visibility: "hidden",
    transition: { duration: hideContentTime, ease: "easeInOut" },
  },
};

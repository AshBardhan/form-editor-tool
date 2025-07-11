interface SidebarProps {
  position?: "left" | "right";
  children: React.ReactNode;
}

const Sidebar = ({ position = "left", children }: SidebarProps) => {
  return <aside className={`sidebar sidebar--${position}`}>{children}</aside>;
};

export { Sidebar };

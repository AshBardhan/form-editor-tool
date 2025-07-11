interface MainContentProps {
  children: React.ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  return <section className="main-content">{children}</section>;
};

export { MainContent };

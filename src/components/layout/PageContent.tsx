interface PageContentProps {
  children: React.ReactNode;
}

const PageContent = ({ children }: PageContentProps) => {
  return <main className="page-content">{children}</main>;
};

export { PageContent };

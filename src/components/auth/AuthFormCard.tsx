/**
 * Shared white card wrapping sign-in / sign-up forms.
 */

interface AuthFormCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthFormCard({
  title,
  description,
  children,
}: AuthFormCardProps) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
}

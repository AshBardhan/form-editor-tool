/**
 * Auth Layout
 * Minimal layout for authentication pages (signin, signup)
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Logo/Header */}
        <div className="pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            FormKit
          </h1>
        </div>
        {/* Auth Content */}
        {children}
      </div>
    </div>
  );
}

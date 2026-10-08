/**
 * Shared white card wrapping sign-in / sign-up forms.
 */

import { AppText } from "@/design-system/app/AppText";

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
        <AppText variant="h2">{title}</AppText>
        <AppText variant="p" className="mt-2 text-app-fg-muted">
          {description}
        </AppText>
      </div>
      {children}
    </div>
  );
}

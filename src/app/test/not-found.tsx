import { AppText } from "@/design-system/app/AppText";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AppText variant="h1" className="mb-4">
        Page Not Found
      </AppText>
      <AppText variant="p" className="text-app-fg-muted">
        This page is not available in the current environment.
      </AppText>
    </div>
  );
}

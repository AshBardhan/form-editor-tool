import { AppText } from "@/design-system/app/AppText";

export default function Loading() {
  return (
    <div className="p-4 bg-app-brand-subtle border border-app-brand rounded-lg">
      <AppText variant="p" className="text-app-brand">Connecting to database...</AppText>
    </div>
  );
}

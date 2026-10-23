import { LoaderCircleIcon } from "lucide-react";
import { AppText } from "@/design-system/app/AppText";

export default function Loading() {
  return (
    <div className="empty-content gap-4">
      <LoaderCircleIcon className="size-10 animate-spin" />
      <AppText variant="span" className="text-2xl">
        Loading Form...
      </AppText>
    </div>
  );
}

import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="empty-content gap-4">
      <LoaderCircleIcon className="size-10 animate-spin" />
      <span className="text-2xl">Loading Form...</span>
    </div>
  );
}
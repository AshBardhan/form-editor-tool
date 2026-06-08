import { Skeleton } from "@/components/ui/Skeleton";

export default function FieldsLoading() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

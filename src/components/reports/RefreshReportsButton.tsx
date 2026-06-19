"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RefreshReportsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleRefresh}
      disabled={isPending}
      aria-label="Refresh submissions report"
      title="Refresh report"
    >
      <RefreshCwIcon className={isPending ? "animate-spin" : ""} />
    </Button>
  );
}

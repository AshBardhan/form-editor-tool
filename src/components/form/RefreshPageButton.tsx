"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCwIcon } from "lucide-react";
import { AppButton } from "@/design-system/app/AppButton";

interface RefreshPageButtonProps {
  label: string;
}

export function RefreshPageButton({ label }: RefreshPageButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <AppButton
      variant="ghost"
      color="secondary"
      onClick={handleRefresh}
      disabled={isPending}
      aria-label={label}
      title={label}
    >
      <RefreshCwIcon className={isPending ? "animate-spin" : ""} />
    </AppButton>
  );
}

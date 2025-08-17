"use client";

import { initMocks } from "@/mocks";
import { JSX, useEffect, useState } from "react";

export function MswProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      initMocks()
        .then(() => setReady(true))
        .catch((err) => {
          console.error("Failed to init MSW", err);
          setReady(true);
        });
    }
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}

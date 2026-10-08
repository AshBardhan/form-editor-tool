"use client";

import { useEffect } from "react";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Database error:", error);
  }, [error]);

  return (
    <>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="shrink-0">
            <svg
              className="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <AppText variant="h3" className="mb-2 text-app-error">
              Database Connection Failed
            </AppText>
            <AppText variant="p" className="mb-4 text-sm text-app-error">
              {error.message || "An unexpected error occurred"}
            </AppText>

            <details className="mb-4">
              <summary className="text-sm font-medium text-red-800 cursor-pointer hover:underline">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-100 p-3 rounded overflow-x-auto">
                {error.stack}
              </pre>
            </details>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
              <AppText variant="p" className="m font-medium">
                Common Issues:
              </AppText>
              <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>PostgreSQL service is not running</li>
                <li>Incorrect DATABASE_URL in .env file</li>
                <li>Database credentials are wrong</li>
                <li>Database does not exist</li>
                <li>Network/firewall blocking connection</li>
              </ul>
            </div>

            <AppButton variant="solid" color="negative" onClick={reset}>
              Try Again
            </AppButton>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <AppText variant="p" className="text-sm text-app-fg-muted">
          <strong>Quick Fix:</strong> Check if PostgreSQL is running:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            sudo systemctl status postgresql
          </code>
        </AppText>
      </div>
    </>
  );
}

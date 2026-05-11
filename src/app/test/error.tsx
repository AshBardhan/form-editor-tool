"use client";

import { useEffect } from "react";

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
            <h3 className="text-lg font-medium text-red-800 mb-2">
              ✗ Database Connection Failed
            </h3>
            <p className="text-sm text-red-700 mb-4">
              {error.message || "An unexpected error occurred"}
            </p>

            <details className="mb-4">
              <summary className="text-sm font-medium text-red-800 cursor-pointer hover:underline">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-100 p-3 rounded overflow-x-auto">
                {error.stack}
              </pre>
            </details>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
              <p className="text-sm text-yellow-800 font-medium mb-2">
                Common Issues:
              </p>
              <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>PostgreSQL service is not running</li>
                <li>Incorrect DATABASE_URL in .env file</li>
                <li>Database credentials are wrong</li>
                <li>Database does not exist</li>
                <li>Network/firewall blocking connection</li>
              </ul>
            </div>

            <button
              onClick={reset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Quick Fix:</strong> Check if PostgreSQL is running:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            sudo systemctl status postgresql
          </code>
        </p>
      </div>
    </>
  );
}

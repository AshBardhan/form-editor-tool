"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="empty-content flex-col gap-3">
      <h2 className="text-lg font-semibold">
        Unable to load form
      </h2>
      <p className="text-sm">
        {error.message}
      </p>
      <button onClick={reset}>
        Try Again
      </button>
    </div>
  );
}
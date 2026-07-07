import { useEffect, useRef } from "react";

export interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  enabled?: boolean;
  debounceMs?: number;
  isEqual?: (previous: T, current: T) => boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  enabled = true,
  debounceMs = 1000,
  isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b),
}: UseAutoSaveOptions<T>) {
  /**
   * Latest observed value.
   */
  const previousDataRef = useRef(data);

  /**
   * Latest value available to the timeout callback.
   */
  const latestDataRef = useRef(data);

  /**
   * Skip first render.
   */
  const initializedRef = useRef(false);

  /**
   * Debounce timer.
   */
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  latestDataRef.current = data;

  useEffect(() => {
    if (!enabled) return;

    /**
     * Ignore first render.
     */
    if (!initializedRef.current) {
      initializedRef.current = true;
      previousDataRef.current = data;
      return;
    }

    /**
     * Nothing changed.
     */
    if (isEqual(previousDataRef.current, data)) {
      return;
    }

    /**
     * Remember latest observed state immediately.
     */
    previousDataRef.current = data;

    /**
     * Restart debounce.
     */
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      void onSave(latestDataRef.current);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, debounceMs, isEqual, onSave]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}

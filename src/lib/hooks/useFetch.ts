import { useEffect, useState } from "react";

/**
 * Fetches a resource and returns the response.
 *
 * @param {string} url The URL of the resource to fetch.
 * @returns An object containing the fetched data, a loading flag, and an error.
 */
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch data");
        const json = (await res.json()) as T;
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted && err instanceof Error) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

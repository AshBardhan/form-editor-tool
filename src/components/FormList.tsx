"use client";

import { FormListItem } from "@/types/form-field";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { useEffect, useState } from "react";

function FormListContent() {
  const [data, setData] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/forms");
        if (!res.ok) {
          throw new Error("Failed to fetch forms. Plaese try again later");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading forms...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Forms</h2>
      {data.length === 0 ? (
        <p>No forms available. Create one to get started.</p>
      ) : (
        data.map((form) => (
          <div key={form.id}>
            <Link
              href={`/builder/${form.id}`}
              className="text-blue-500 underline"
            >
              {form.name}
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default function FormList() {
  return (
    <Card>
      <CardContent>
        <FormListContent />
      </CardContent>
    </Card>
  );
}

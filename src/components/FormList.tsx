"use client";

import { useFetch } from "@/lib/hooks/useFetch";
import { FormListItem } from "@/types/form-field";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

function FormListContent() {
  const { data, loading, error } = useFetch<FormListItem[]>("/api/forms");

  if (loading) return <p>Loading forms...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Forms</h2>
      {!data || data.length === 0 ? (
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

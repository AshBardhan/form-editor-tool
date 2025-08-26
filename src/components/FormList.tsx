"use client";

import { useFetch } from "@/lib/hooks/useFetch";
import { FormListItem } from "@/types/form-field";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { LoaderCircleIcon } from "lucide-react";

function FormListContent() {
  const { data, loading, error } = useFetch<FormListItem[]>("/api/forms");

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2">
        <LoaderCircleIcon className="size-6 animate-spin" />
        <span className="text-lg">Loading Forms...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-1">Unable to load forms</h2>
        <p className="text-sm">Please check try again later.</p>
      </div>
    );

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Forms</h2>
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

"use client";

import { useFetch } from "@/lib/hooks/useFetch";
import { FormListItem } from "@/lib/types/form";
import { FormCard } from "./FormCard";
import Text from "@/components/ui/Text";
import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * FormGrid - Grid layout for displaying forms
 * Handles data fetching, loading, and error states
 * Renders FormCard components in a responsive grid
 */
export function FormGrid() {
  const { data, loading, error } = useFetch<FormListItem[]>("/api/forms");

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-full relative">
            {/* Badge skeleton */}
            <Skeleton
              className="absolute top-3 right-3"
              width={60}
              height={15}
            />

            <CardContent className="px-6 space-y-2">
              {/* Title skeleton */}
              <Skeleton width="70%" height={20} />

              {/* Metrics skeletons */}
              <div className="flex gap-8 pt-2">
                <div className="space-y-1">
                  <Skeleton width={40} height={20} />
                  <Skeleton width={60} height={10} />
                </div>
                <div className="space-y-1">
                  <Skeleton width={40} height={20} />
                  <Skeleton width={60} height={10} />
                </div>
                <div className="space-y-1">
                  <Skeleton width={40} height={20} />
                  <Skeleton width={60} height={10} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Text variant="h4" className="mb-1">
          Unable to load forms
        </Text>
        <Text variant="p" className="text-sm text-muted-foreground">
          Please check try again later.
        </Text>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="h4" className="mb-2">
          No forms yet
        </Text>
        <Text variant="p" className="text-sm text-muted-foreground">
          Create your first form to get started.
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}

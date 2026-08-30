import { revalidateTag } from "next/cache";
import {
  FORM_ANALYTICS_CACHE_TAG,
  FORM_BUILDER_CACHE_TAG,
  FORM_FIELD_ANALYSIS_CACHE_TAG,
  FORM_META_CACHE_TAG,
  FORM_SUBMISSIONS_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
} from "@/lib/queries/forms";

const FORM_MUTATION_CACHE_TAGS = [
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
  FORM_ANALYTICS_CACHE_TAG,
  FORM_FIELD_ANALYSIS_CACHE_TAG,
  FORM_SUBMISSIONS_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
] as const;

export function revalidateFormMutationCache() {
  for (const tag of FORM_MUTATION_CACHE_TAGS) {
    revalidateTag(tag);
  }
}

export function revalidateFormAnalyticsCache() {
  revalidateTag(FORM_ANALYTICS_CACHE_TAG);
}

import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import {
  FormConfig,
  FormBlockProps,
  FormBlockType,
  FormPageData,
  FormReportPageData,
  ButtonAlignment,
} from "@/lib/types/form";

const FORM_BUILDER_CACHE_TAG = "form-builder";
const FORM_META_CACHE_TAG = "form-meta";
const FORM_REPORT_CACHE_TAG = "form-report";
const PUBLIC_FORM_CACHE_TAG = "public-form";

/**
 * Loads minimal form metadata for the layout header.
 * Only fetches id, slug, title, status, and userId - no blocks.
 */
const getFormMetaDataCached = cache(async (slug: string) => {
  const form = await prisma.form.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      userId: true,
    },
  });

  return form;
});

/**
 * Loads the shared form page payload used by the builder view.
 * Wrapped in React cache so the same request can reuse the result.
 */
const getFormBuilderDataCached = cache(
  async (slug: string): Promise<FormPageData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        theme: true,
        status: true,
        submitLabel: true,
        resetLabel: true,
        actionsAlignment: true,
        actionsReverse: true,
        hideReset: true,
        blocks: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            type: true,
            name: true,
            props: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    if (!form || !form.slug) {
      return null;
    }

    return {
      id: form.id,
      slug: form.slug,
      title: form.title,
      description: form.description ?? undefined,
      theme: form.theme,
      status: form.status,
      submissionCount: form._count.submissions,
      actions: {
        submitLabel: form.submitLabel,
        resetLabel: form.resetLabel,
        alignment: form.actionsAlignment as ButtonAlignment,
        reverse: form.actionsReverse,
        hideReset: form.hideReset,
      },
      blocks: form.blocks.map((block) => ({
        id: block.id,
        type: block.type as FormBlockType,
        name: block.name,
        props: block.props as FormBlockProps,
      })),
    };
  },
);

/**
 * Loads the report payload for responses and field analysis views.
 * Wrapped in React cache so both report pages can reuse the same fetch result.
 */
const getFormReportDataCached = cache(
  async (slug: string): Promise<FormReportPageData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        views: true,
        starts: true,
        completions: true,
        submitAttempts: true,
        submissions: {
          orderBy: { submittedAt: "desc" },
          select: {
            id: true,
            submittedAt: true,
            responses: {
              select: {
                id: true,
                blockId: true,
                value: true,
                block: {
                  select: {
                    type: true,
                    name: true,
                    props: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!form) {
      return null;
    }

    return {
      form: {
        id: form.id,
        title: form.title,
      },
      metrics: {
        submissions: form.submissions.length,
        views: form.views ?? 0,
        starts: form.starts ?? 0,
        completions: form.completions ?? 0,
        submitAttempts: form.submitAttempts ?? 0,
      },
      submissions: form.submissions.map((submission) => ({
        id: submission.id,
        submittedAt: submission.submittedAt.toISOString(),
        responses: submission.responses.map((response) => ({
          id: response.id,
          blockId: response.blockId,
          blockType: response.block.type as FormBlockType,
          blockName: response.block.name,
          blockProps: response.block.props as FormBlockProps,
          value: response.value as string | number | boolean | string[] | null,
        })),
      })),
    };
  },
);

/**
 * Loads the public form payload for the public form page.
 * Wrapped in React cache so repeated requests can reuse the same result.
 */
const getPublicFormDataCached = cache(
  async (slug: string): Promise<FormConfig | null> => {
    const form = await prisma.form.findUnique({
      where: { slug, status: "published" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        theme: true,
        status: true,
        submitLabel: true,
        resetLabel: true,
        actionsAlignment: true,
        actionsReverse: true,
        hideReset: true,
        blocks: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            type: true,
            name: true,
            props: true,
          },
        },
      },
    });

    if (!form || !form.slug) {
      return null;
    }

    return {
      id: form.id,
      slug: form.slug,
      title: form.title,
      description: form.description ?? undefined,
      theme: form.theme,
      status: form.status,
      actions: {
        submitLabel: form.submitLabel,
        resetLabel: form.resetLabel,
        alignment: form.actionsAlignment as ButtonAlignment,
        reverse: form.actionsReverse,
        hideReset: form.hideReset,
      },
      blocks: form.blocks.map((block) => ({
        id: block.id,
        type: block.type as FormBlockType,
        name: block.name,
        props: block.props as FormBlockProps,
      })),
    };
  },
);

/**
 * Returns cached form metadata for layout header.
 */
export const getFormMetaData = unstable_cache(
  getFormMetaDataCached,
  [FORM_META_CACHE_TAG],
  {
    tags: [FORM_META_CACHE_TAG],
    revalidate: 300,
  },
);

/**
 * Returns cached form builder data and marks it with the form-builder tag for invalidation.
 */
export const getFormBuilderData = unstable_cache(
  getFormBuilderDataCached,
  [FORM_BUILDER_CACHE_TAG],
  {
    tags: [FORM_BUILDER_CACHE_TAG],
    revalidate: 300,
  },
);

/**
 * Returns cached report data and marks it with the form-report tag for invalidation.
 */
export const getFormReportData = unstable_cache(
  getFormReportDataCached,
  [FORM_REPORT_CACHE_TAG],
  {
    tags: [FORM_REPORT_CACHE_TAG],
    revalidate: 300,
  },
);

/**
 * Returns cached public form data and marks it with the public-form tag for invalidation.
 */
export const getPublicFormData = unstable_cache(
  getPublicFormDataCached,
  [PUBLIC_FORM_CACHE_TAG],
  {
    tags: [PUBLIC_FORM_CACHE_TAG],
    revalidate: 300,
  },
);

export {
  FORM_BUILDER_CACHE_TAG,
  FORM_META_CACHE_TAG,
  FORM_REPORT_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
};

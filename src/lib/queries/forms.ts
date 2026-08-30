import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import {
  FormConfig,
  FormBlock,
  FormBlockProps,
  FormBlockType,
  FormPageData,
  ButtonAlignment,
} from "@/lib/types/form";
import {
  FormAnalyticsOverviewData,
  FormFieldAnalysisData,
  FormFieldResponseValue,
  FormSubmissionsListData,
} from "@/lib/types/analytics";
import { isFieldBasedBlock } from "@/lib/utils/formUtils";

const FORM_BUILDER_CACHE_TAG = "form-builder";
const FORM_META_CACHE_TAG = "form-meta";
const FORM_ANALYTICS_CACHE_TAG = "form-analytics";
const FORM_FIELD_ANALYSIS_CACHE_TAG = "form-field-analysis";
const FORM_SUBMISSIONS_CACHE_TAG = "form-submissions";
const PUBLIC_FORM_CACHE_TAG = "public-form";

function mapFieldBlocks(
  blocks: {
    id: string;
    type: string;
    name: string;
    props: unknown;
  }[],
): FormBlock[] {
  return blocks
    .filter((block) => isFieldBasedBlock(block.type as FormBlockType))
    .map((block) => ({
      id: block.id,
      type: block.type as FormBlockType,
      name: block.name,
      props: block.props as FormBlockProps,
    }));
}

function mapFieldResponseValue(value: unknown): FormFieldResponseValue["value"] {
  return value as FormFieldResponseValue["value"];
}

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

const fieldBlockSelect = {
  orderBy: { order: "asc" as const },
  select: {
    id: true,
    type: true,
    name: true,
    props: true,
  },
};

const fieldResponseSelect = {
  select: {
    blockId: true,
    value: true,
  },
};

/**
 * Funnel counters only — no field values or submission rows.
 */
const getFormAnalyticsOverviewDataCached = cache(
  async (slug: string): Promise<FormAnalyticsOverviewData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        views: true,
        starts: true,
        completions: true,
        submitAttempts: true,
        _count: {
          select: { submissions: true },
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
        submissions: form._count.submissions,
        views: form.views ?? 0,
        starts: form.starts ?? 0,
        completions: form.completions ?? 0,
        submitAttempts: form.submitAttempts ?? 0,
      },
    };
  },
);

/**
 * Field-centric payload: blocks plus flat { blockId, value } answers.
 */
const getFormFieldAnalysisDataCached = cache(
  async (slug: string): Promise<FormFieldAnalysisData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        _count: {
          select: { submissions: true },
        },
        blocks: fieldBlockSelect,
        submissions: {
          select: {
            responses: fieldResponseSelect,
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
      fieldBlocks: mapFieldBlocks(form.blocks),
      submissionCount: form._count.submissions,
      responses: form.submissions.flatMap((submission) =>
        submission.responses.map((response) => ({
          blockId: response.blockId,
          value: mapFieldResponseValue(response.value),
        })),
      ),
    };
  },
);

/**
 * Row-centric submissions list. Isolated so pagination can be added later.
 */
const getFormSubmissionsListDataCached = cache(
  async (slug: string): Promise<FormSubmissionsListData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        blocks: fieldBlockSelect,
        submissions: {
          orderBy: { submittedAt: "desc" },
          select: {
            id: true,
            submittedAt: true,
            responses: fieldResponseSelect,
          },
        },
      },
    });

    if (!form || !form.slug) {
      return null;
    }

    return {
      form: {
        id: form.id,
        slug: form.slug,
        title: form.title,
      },
      fieldBlocks: mapFieldBlocks(form.blocks),
      submissions: form.submissions.map((submission) => ({
        id: submission.id,
        submittedAt: submission.submittedAt.toISOString(),
        responses: submission.responses.map((response) => ({
          blockId: response.blockId,
          value: mapFieldResponseValue(response.value),
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

export const getFormAnalyticsOverviewData = unstable_cache(
  getFormAnalyticsOverviewDataCached,
  [FORM_ANALYTICS_CACHE_TAG],
  {
    tags: [FORM_ANALYTICS_CACHE_TAG],
    revalidate: 300,
  },
);

export const getFormFieldAnalysisData = unstable_cache(
  getFormFieldAnalysisDataCached,
  [FORM_FIELD_ANALYSIS_CACHE_TAG],
  {
    tags: [FORM_FIELD_ANALYSIS_CACHE_TAG],
    revalidate: 300,
  },
);

export const getFormSubmissionsListData = unstable_cache(
  getFormSubmissionsListDataCached,
  [FORM_SUBMISSIONS_CACHE_TAG],
  {
    tags: [FORM_SUBMISSIONS_CACHE_TAG],
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
  FORM_ANALYTICS_CACHE_TAG,
  FORM_FIELD_ANALYSIS_CACHE_TAG,
  FORM_SUBMISSIONS_CACHE_TAG,
  PUBLIC_FORM_CACHE_TAG,
};

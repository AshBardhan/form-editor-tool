import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import {
  FormBlockProps,
  FormBlockType,
  FormPageData,
  FormReportPageData,
} from "@/lib/types/form";

const FORM_PAGE_CACHE_TAG = "form-page";
const FORM_REPORT_CACHE_TAG = "form-report";

/**
 * Loads the shared form page payload used by the header and builder views.
 * Wrapped in React cache so the same request can reuse the result.
 */
const getFormPageDataCached = cache(
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
const getFormReportPageDataCached = cache(
  async (slug: string): Promise<FormReportPageData | null> => {
    const form = await prisma.form.findUnique({
      where: { slug },
      select: { id: true, title: true },
    });

    if (!form) {
      return null;
    }

    const submissions = await prisma.formSubmission.findMany({
      where: { formId: form.id },
      include: {
        responses: {
          include: {
            block: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return {
      form: {
        id: form.id,
        title: form.title,
      },
      submissions: submissions.map((submission) => ({
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
 * Returns cached form page data and marks it with the form-page tag for invalidation.
 */
export const getFormPageData = unstable_cache(
  getFormPageDataCached,
  [FORM_PAGE_CACHE_TAG],
  {
    tags: [FORM_PAGE_CACHE_TAG],
    revalidate: 300,
  },
);

/**
 * Returns cached report data and marks it with the form-report tag for invalidation.
 */
export const getFormReportPageData = unstable_cache(
  getFormReportPageDataCached,
  [FORM_REPORT_CACHE_TAG],
  {
    tags: [FORM_REPORT_CACHE_TAG],
    revalidate: 300,
  },
);

export { FORM_PAGE_CACHE_TAG, FORM_REPORT_CACHE_TAG };

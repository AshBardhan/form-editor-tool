// Import mock data
import {
  mockForms,
  mockSubmissions,
  mockUser,
  getFormById,
  getFormBySlug,
  getBlocksForForm,
  getSubmissionsForForm,
  getMockStats,
} from "./data";
import { FormStatus } from "@prisma/client";

/**
 * Mock Prisma Client for offline development
 *
 * This mock client mimics the Prisma API to enable offline development
 * without a database connection.
 *
 * Uses hardcoded mock data from src/mocks/data/
 * - 10 unique forms with edge cases
 * - Up to 20 submissions per form
 * - Various field types and scenarios
 */

const stats = getMockStats();
console.log(
  `[Mock Prisma] Loaded ${stats.totalForms} forms (${stats.publishedForms} published, ${stats.draftForms} draft), ${stats.totalSubmissions} submissions`,
);

/* eslint-disable @typescript-eslint/no-explicit-any */

interface MockPrismaClient {
  form: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args?: any) => Promise<any | null>;
    findFirst: (args?: any) => Promise<any | null>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    updateMany: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
    count: () => Promise<number>;
  };
  formSubmission: {
    findMany: (args?: any) => Promise<any[]>;
    create: (args: any) => Promise<any>;
  };
  formBlock: {
    findMany: (args?: any) => Promise<any[]>;
    update: (args: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    deleteMany: (args: any) => Promise<any>;
  };
  formFieldResponse: {
    count: (args?: any) => Promise<number>;
  };
  user: {
    findFirst: (args?: any) => Promise<any | null>;
    count: () => Promise<number>;
  };
  $queryRaw: (query: any) => Promise<any[]>;
  $transaction: (callback: (tx: any) => Promise<any>) => Promise<any>;
  $disconnect: () => Promise<void>;
}

export const mockPrisma: MockPrismaClient = {
  // ============================================
  // Form Model
  // ============================================
  form: {
    /**
     * Find many forms - Used by dashboard
     */
    findMany: async (args?: any) => {
      console.log("[Mock Prisma] form.findMany called with:", args);

      let forms = [...mockForms];

      // Apply filters
      if (args?.where?.status) {
        forms = forms.filter((f: any) => f.status === args.where.status);
      }

      // Apply pagination
      const skip = args?.skip || 0;
      const take = args?.take || forms.length;
      const paginatedForms = forms.slice(skip, skip + take);

      // Return in dashboard format
      return paginatedForms.map((form: any) => ({
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: form.description,
        theme: form.theme,
        status: form.status as FormStatus,
        createdAt: new Date(form.createdAt),
        updatedAt: new Date(form.updatedAt),
        publishedAt: form.publishedAt ? new Date(form.publishedAt) : null,
        views: form.views,
        starts: form.starts,
        completions: form.completions,
        submitAttempts: form.submitAttempts,
        _count: {
          blocks: getBlocksForForm(form.id).length,
          submissions: getSubmissionsForForm(form.id).length,
        },
      }));
    },

    /**
     * Find unique form - Used by builder and reports
     */
    findUnique: async ({ where }: any = {}) => {
      console.log("[Mock Prisma] form.findUnique called with:", where);

      if (!where) return null;

      // Get form by slug or id
      const form = where.slug
        ? getFormBySlug(where.slug)
        : getFormById(where.id);

      if (!form) return null;

      // Check status filter
      if (where.status && form.status !== where.status) {
        return null;
      }

      // Get blocks for this form
      const blocks = getBlocksForForm(form.id);

      // Return form in expected format
      return {
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: form.description || null,
        theme: form.theme || "light",
        status: form.status as FormStatus,
        createdAt: new Date(form.createdAt),
        updatedAt: new Date(form.updatedAt),
        publishedAt: form.publishedAt ? new Date(form.publishedAt) : null,
        views: form.views,
        starts: form.starts,
        completions: form.completions,
        submitAttempts: form.submitAttempts,
        blocks: blocks.map((block: any) => ({
          id: block.id,
          type: block.type,
          name: block.name,
          props: block.props,
          order: block.order,
          formId: form.id,
          createdAt: new Date(form.createdAt),
          updatedAt: new Date(form.updatedAt),
        })),
      };
    },

    /**
     * Find first form - Used by API routes for lookups
     */
    findFirst: async (args?: any) => {
      console.log("[Mock Prisma] form.findFirst called with:", args);

      // Used to check for duplicates - return null (no duplicate)
      if (args?.where?.OR) {
        return null;
      }

      // Get form by slug if provided
      const requestedSlug = args?.where?.slug;
      const form = requestedSlug
        ? getFormBySlug(requestedSlug)
        : mockForms[0] || null;

      if (!form) return null;

      // Check status filter
      if (args?.where?.status === "published") {
        if (form.status !== "published") {
          return null;
        }

        const blocks = getBlocksForForm(form.id);
        return {
          id: form.id,
          slug: form.slug,
          title: form.title,
          status: form.status as FormStatus,
          blocks: blocks.map((block: any) => ({
            id: block.id,
            type: block.type,
            name: block.name,
            props: block.props,
            order: block.order,
          })),
        };
      }

      // Default: return form
      return {
        id: form.id,
        slug: form.slug,
        title: form.title,
      };
    },

    /**
     * Create form - Used by form creation
     */
    create: async (args) => {
      console.log("[Mock Prisma] form.create called with:", args);

      const newFormId = `form-${Date.now()}`;
      const createdBlocks =
        args.include?.blocks && args.data.blocks?.create
          ? args.data.blocks.create.map((block: any, index: number) => ({
              id: `block-${Date.now()}-${index}`,
              type: block.type,
              name: block.name,
              props: block.props,
              order: block.order || index,
              formId: newFormId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }))
          : [];

      return {
        id: newFormId,
        slug: args.data.slug || newFormId,
        title: args.data.title || "New Form",
        description: args.data.description || null,
        theme: args.data.theme || "default",
        status: args.data.status || "draft",
        userId: args.data.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        starts: 0,
        completions: 0,
        submitAttempts: 0,
        ...(args.include?.blocks && { blocks: createdBlocks }),
      };
    },

    /**
     * Update form - Used by form updates
     */
    update: async (args) => {
      console.log("[Mock Prisma] form.update called with:", args);

      const existingForm = mockForms[0]; // Use first form as fallback

      return {
        id: existingForm.id,
        slug: args.where.slug || args.where.id,
        title: args.data.title || existingForm.title,
        description: args.data.description || existingForm.description || null,
        theme: args.data.theme || existingForm.theme || "light",
        status: args.data.status || existingForm.status,
        updatedAt: new Date(),
      };
    },

    /**
     * Delete form - Used by form deletion
     */
    delete: async (args) => {
      console.log("[Mock Prisma] form.delete called with:", args);

      const existingForm = mockForms[0]; // Use first form as fallback

      return {
        id: existingForm.id,
        slug: args.where.slug || args.where.id,
      };
    },

    /**
     * Update many forms - Used by analytics
     */
    updateMany: async (args) => {
      console.log("[Mock Prisma] form.updateMany called with:", args);

      // Return count of updated records
      return { count: 1 };
    },

    /**
     * Count forms - Used by test page
     */
    count: async () => {
      console.log("[Mock Prisma] form.count called");
      return mockForms.length;
    },
  },

  // ============================================
  // Form Submission Model
  // ============================================
  formSubmission: {
    /**
     * Find many submissions - Used by reports
     */
    findMany: async (args?: any) => {
      console.log("[Mock Prisma] formSubmission.findMany called with:", args);

      const formId = args?.where?.formId;
      const submissions = formId
        ? getSubmissionsForForm(formId)
        : mockSubmissions;

      // Get the form to access its blocks
      const form = formId ? getFormById(formId) : null;
      const formBlocks = form ? getBlocksForForm(form.id) : [];

      // Return submissions in the format expected by reports
      return submissions.map((submission) => ({
        id: submission.id,
        formId: submission.formId,
        submittedAt: new Date(submission.submittedAt),
        responses: submission.responses.map((response) => {
          // Find the block for this response
          const block = formBlocks.find((b) => b.id === response.blockId);

          return {
            id: `response-${submission.id}-${response.blockId}`,
            blockId: response.blockId,
            submissionId: submission.id,
            value: response.value,
            createdAt: new Date(submission.submittedAt),
            block: block
              ? {
                  id: block.id,
                  type: block.type,
                  name: block.name,
                  props: block.props,
                  formId: submission.formId,
                  order: block.order,
                  createdAt: new Date(submission.submittedAt),
                  updatedAt: new Date(submission.submittedAt),
                }
              : null,
          };
        }),
      }));
    },

    /**
     * Create submission - Used by public form submission
     */
    create: async (args) => {
      console.log("[Mock Prisma] formSubmission.create called with:", args);

      return {
        id: `submission-${Date.now()}`,
        formId: args.data.formId,
        submittedAt: new Date(),
      };
    },
  },

  // ============================================
  // Form Block Model (for transactions)
  // ============================================
  formBlock: {
    findMany: async (args?: any) => {
      console.log("[Mock Prisma] formBlock.findMany called with:", args);
      return [];
    },

    update: async (args: any) => {
      console.log("[Mock Prisma] formBlock.update called with:", args);
      return {
        id: args.where.id,
        ...args.data,
      };
    },

    create: async (args: any) => {
      console.log("[Mock Prisma] formBlock.create called with:", args);
      return {
        id: `block-${Date.now()}`,
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },

    deleteMany: async (args: any) => {
      console.log("[Mock Prisma] formBlock.deleteMany called with:", args);
      return { count: 0 };
    },
  },

  // ============================================
  // Form Field Response Model (for validation)
  // ============================================
  formFieldResponse: {
    count: async (args?: any) => {
      console.log("[Mock Prisma] formFieldResponse.count called with:", args);
      return 0;
    },
  },

  // ============================================
  // User Model (for test page)
  // ============================================
  user: {
    findFirst: async (args?: any) => {
      console.log("[Mock Prisma] user.findFirst called with:", args);

      // Return mock user
      return {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: new Date(mockUser.createdAt),
      };
    },

    count: async () => {
      console.log("[Mock Prisma] user.count called");
      return 1;
    },
  },

  // ============================================
  // Utilities
  // ============================================

  /**
   * Raw query - Used by test page
   */
  $queryRaw: async (query: any) => {
    console.log("[Mock Prisma] $queryRaw called with:", query);
    return [{ version: "Mock PostgreSQL 14.0 (Mock Prisma Enabled)" }];
  },

  /**
   * Transaction - Used by complex update operations
   * Simplified: executes callback with mockPrisma as transaction client
   */
  $transaction: async (callback: (tx: any) => Promise<any>) => {
    console.log("[Mock Prisma] $transaction called");

    // Execute callback with mockPrisma itself as the transaction client
    // This allows all operations inside the transaction to use mocked methods
    return await callback(mockPrisma);
  },

  /**
   * Disconnect - Used for cleanup
   */
  $disconnect: async () => {
    console.log("[Mock Prisma] $disconnect called");
    // No-op for mock client
  },
};

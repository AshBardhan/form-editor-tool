import { sampleFormList } from "./data/sampleFormsList";
import { sampleForm, getFormBySlug } from "./data/sampleForms";
import { sampleSubmissions } from "./data/sampleSubmissions";
import { FormStatus } from "@prisma/client";

/**
 * Mock Prisma Client for server-side data fetching
 * 
 * This mock client mimics the Prisma API to enable offline development
 * without a database connection. It returns sample data for all queries.
 */

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
      
      // Return forms in the format expected by dashboard
      return sampleFormList.map((form) => ({
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: null,
        theme: "default",
        status: form.status as FormStatus,
        createdAt: new Date("2026-06-01"),
        updatedAt: new Date("2026-06-20"),
        views: form.metrics.views || 0,
        starts: form.metrics.starts || 0,
        completions: form.metrics.completions || 0,
        submitAttempts: form.metrics.submitAttempts || 0,
        _count: {
          blocks: form.metrics.blocks || 0,
          submissions: form.metrics.submissions || 0,
        },
      }));
    },

    /**
     * Find unique form - Used by builder and reports
     */
    findUnique: async ({ where }: any = {}) => {
      console.log("[Mock Prisma] form.findUnique called with:", where);

      if (!where) return null;

      // Get form by slug if provided, otherwise use default
      const form = where.slug ? getFormBySlug(where.slug) : sampleForm;
      
      if (!form) return null;

      // Check if filtering by status (for published forms)
      if (where.status && form.status !== where.status) {
        return null;
      }

      // Return form in the format expected by queries
      return {
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: form.description || null,
        theme: form.theme || "default",
        status: form.status as FormStatus,
        createdAt: new Date("2026-06-01"),
        updatedAt: new Date("2026-06-20"),
        views: 450,
        starts: 380,
        completions: 20,
        submitAttempts: 25,
        blocks: form.blocks.map((block, index) => ({
          id: block.id,
          type: block.type,
          name: block.name,
          props: block.props,
          order: index,
          formId: form.id,
          createdAt: new Date("2026-06-01"),
          updatedAt: new Date("2026-06-20"),
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
      const form = requestedSlug ? getFormBySlug(requestedSlug) : sampleForm;

      if (!form) return null;

      // Used to find published forms
      if (args?.where?.status === "published") {
        if (form.status !== "published") {
          return null;
        }
        return {
          id: form.id,
          slug: form.slug,
          title: form.title,
          status: form.status as FormStatus,
          blocks: form.blocks.map((block, index) => ({
            id: block.id,
            type: block.type,
            name: block.name,
            props: block.props,
            order: index,
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
      const createdBlocks = args.include?.blocks && args.data.blocks?.create
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
      
      return {
        id: sampleForm.id,
        slug: args.where.slug || args.where.id,
        title: args.data.title || sampleForm.title,
        description: args.data.description || sampleForm.description || null,
        theme: args.data.theme || sampleForm.theme || "default",
        status: args.data.status || sampleForm.status,
        updatedAt: new Date(),
      };
    },

    /**
     * Delete form - Used by form deletion
     */
    delete: async (args) => {
      console.log("[Mock Prisma] form.delete called with:", args);
      
      return {
        id: sampleForm.id,
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
      return sampleFormList.length;
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
      
      // Return submissions in the format expected by reports
      return sampleSubmissions.map((submission) => ({
        id: submission.id,
        formId: args?.where?.formId || sampleForm.id,
        submittedAt: new Date(submission.submittedAt),
        responses: submission.responses.map((response) => ({
          id: response.id,
          blockId: response.blockId,
          submissionId: submission.id,
          value: response.value,
          createdAt: new Date(submission.submittedAt),
          block: {
            id: response.blockId,
            type: response.blockType,
            name: response.blockName,
            props: response.blockProps,
            formId: args?.where?.formId || sampleForm.id,
            order: 0,
            createdAt: new Date("2026-06-01"),
            updatedAt: new Date("2026-06-20"),
          },
        })),
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
      
      // Return a mock user for form creation
      return {
        id: "user-mock-001",
        email: "mock@example.com",
        name: "Mock User",
        createdAt: new Date("2026-01-01"),
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

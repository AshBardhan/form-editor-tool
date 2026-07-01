// Import mock data
import { mockForms, mockBlocks, mockSubmissions, mockUser } from "./data";
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

const mockDatabase = {
  forms: structuredClone(mockForms),
  blocks: structuredClone(mockBlocks),
  submissions: structuredClone(mockSubmissions),
};

/**
 * Get form by ID
 */
function getFormById(id: string) {
  return mockDatabase.forms.find((f) => f.id === id) || null;
}

/**
 * Get form by slug
 */
function getFormBySlug(slug: string) {
  return mockDatabase.forms.find((f) => f.slug === slug) || null;
}

/**
 * Get blocks for a form
 */
function getBlocksForForm(formId: string) {
  return mockDatabase.blocks.filter((block) => block.formId === formId);
}

/**
 * Get submissions for a form
 */
function getSubmissionsForForm(formId: string) {
  return mockDatabase.submissions.filter((s) => s.formId === formId);
}

/**
 * Get published forms
 */
function getPublishedForms() {
  return mockDatabase.forms.filter((f) => f.status === "published");
}

/**
 * Get draft forms
 */
function getDraftForms() {
  return mockDatabase.forms.filter((f) => f.status === "draft");
}

/**
 * Get archived forms
 */
function getArchivedForms() {
  return mockDatabase.forms.filter((f) => f.status === "archived");
}

/**
 * Get mock stats
 */
function getMockStats() {
  return {
    totalForms: mockDatabase.forms.length,
    publishedForms: getPublishedForms().length,
    draftForms: getDraftForms().length,
    archivedForms: getArchivedForms().length,
    totalSubmissions: mockDatabase.submissions.length,
    totalBlocks: mockDatabase.blocks.length,
  };
}

const stats = getMockStats();
console.log(
  `[Mock Prisma] Loaded ${stats.totalForms} forms (${stats.publishedForms} published, ${stats.draftForms} draft, ${stats.archivedForms} archived), ${stats.totalSubmissions} submissions`,
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

      let forms = [...mockDatabase.forms];

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
        status: form.status as FormStatus,
        views: form.views,
        blocks: getBlocksForForm(form.id).map((block: any) => ({
          id: block.id,
          type: block.type,
        })),
        _count: {
          submissions: getSubmissionsForForm(form.id).length,
        },
      }));
    },

    /**
     * Find unique form - Used by builder and reports
     */
    findUnique: async (args: any = {}) => {
      console.log("[Mock Prisma] form.findUnique called with:", args);

      const { where } = args;
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

      // Get submissions for this form (for report data with submissions include)
      const submissions = getSubmissionsForForm(form.id);

      // Return form in expected format
      const result: any = {
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

      // Handle select option (for report data with nested submissions)
      if (args?.select) {
        const selectedResult: any = {};

        Object.keys(args.select).forEach((key) => {
          if (key === "submissions" && args.select[key]) {
            // Handle nested submissions with select
            const submissionsConfig = args.select.submissions;

            selectedResult.submissions = submissions.map((submission: any) => {
              const submissionResult: any = {
                id: submission.id,
                submittedAt: new Date(submission.submittedAt),
              };

              // Handle responses with nested select
              if (submissionsConfig.select?.responses) {
                const responsesConfig = submissionsConfig.select.responses;

                submissionResult.responses = submission.responses.map(
                  (response: any) => {
                    const block = blocks.find(
                      (b: any) => b.id === response.blockId,
                    );
                    const responseResult: any = {
                      id: `response-${submission.id}-${response.blockId}`,
                      blockId: response.blockId,
                      value: response.value,
                    };

                    // Handle nested block select
                    if (responsesConfig.select?.block) {
                      const blockSelect = responsesConfig.select.block.select;
                      if (block && blockSelect) {
                        responseResult.block = {};
                        Object.keys(blockSelect).forEach((blockKey) => {
                          if (blockSelect[blockKey]) {
                            responseResult.block[blockKey] = (block as any)[
                              blockKey
                            ];
                          }
                        });
                      }
                    }

                    return responseResult;
                  },
                );
              }

              return submissionResult;
            });
          } else if (args.select[key]) {
            selectedResult[key] = result[key];
          }
        });

        return selectedResult;
      }

      // Handle submissions include (for report data)
      if (args?.include?.submissions) {
        result.submissions = submissions.map((submission: any) => ({
          id: submission.id,
          formId: submission.formId,
          submittedAt: new Date(submission.submittedAt),
          responses: submission.responses.map((response: any) => {
            const block = blocks.find((b: any) => b.id === response.blockId);
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
      }

      return result;
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
        : mockDatabase.forms[0] || null;

      if (!form) return null;

      // Check status filter
      if (args?.where?.status === "published") {
        if (form.status !== "published") {
          return null;
        }

        const blocks = getBlocksForForm(form.id);

        // Handle select with nested blocks (for submissions route)
        if (args.select) {
          const result: any = {};
          Object.keys(args.select).forEach((key) => {
            if (key === "blocks" && args.select[key]?.select) {
              // Nested select for blocks
              result.blocks = blocks.map((block: any) => {
                const selectedBlock: any = {};
                Object.keys(args.select.blocks.select).forEach((blockKey) => {
                  selectedBlock[blockKey] = block[blockKey];
                });
                return selectedBlock;
              });
            } else if (args.select[key]) {
              result[key] = (form as any)[key];
            }
          });
          return result;
        }

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

      const newForm = {
        id: newFormId,
        slug: args.data.slug || newFormId,
        title: args.data.title || "New Form",
        description: args.data.description || null,
        theme: args.data.theme || "default",
        status: args.data.status || "draft",
        userId: args.data.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: null,
        views: 0,
        starts: 0,
        completions: 0,
        submitAttempts: 0,
      };

      // Add to mock database
      mockDatabase.forms.push({
        ...newForm,
        createdAt: newForm.createdAt.toISOString(),
        updatedAt: newForm.updatedAt.toISOString(),
      });

      return newForm;
    },

    /**
     * Update form - Used by form updates
     */
    update: async (args) => {
      console.log("[Mock Prisma] form.update called with:", args);

      const formId = args.where.id;
      const currentForm = getFormById(formId);

      if (!currentForm) {
        return null;
      }

      const updatedForm: any = {
        ...currentForm,
        title: args.data.title || currentForm.title,
        description: args.data.description || currentForm.description || null,
        theme: args.data.theme || currentForm.theme || "light",
        status: args.data.status || currentForm.status,
        publishedAt: currentForm.publishedAt
          ? new Date(currentForm.publishedAt)
          : new Date(),
        updatedAt: new Date(),
      };

      // Update the mock database
      mockDatabase.forms = mockDatabase.forms.map((form) => {
        if (form.id === formId) {
          return {
            ...form,
            ...updatedForm,
            publishedAt: updatedForm.publishedAt?.toISOString() || null,
            updatedAt: updatedForm.updatedAt.toISOString(),
          };
        }
        return form;
      });

      // Update blocks if provided
      if (args.data.blocks) {
        // Remove existing blocks for this form
        mockDatabase.blocks = mockDatabase.blocks.filter(
          (block) => block.formId !== formId,
        );

        // Add updated blocks
        const updatedBlocks = args.data.blocks.map((block: any) => ({
          id: block.id || `block-${Date.now()}-${Math.random()}`,
          formId: formId,
          type: block.type,
          name: block.name,
          props: block.props,
          order: block.order,
          createdAt: block.createdAt || updatedForm.updatedAt.toISOString(),
          updatedAt: updatedForm.updatedAt.toISOString(),
        }));

        mockDatabase.blocks.push(...updatedBlocks);
      }

      // Handle select option (for PATCH status updates)
      if (args.select) {
        const result: any = {};
        Object.keys(args.select).forEach((key) => {
          if (args.select[key]) {
            result[key] = (updatedForm as any)[key];
          }
        });
        return result;
      }

      // Handle include option (for PUT with blocks)
      return {
        ...updatedForm,
        ...(args.include?.blocks || args.data.blocks
          ? { blocks: args.data.blocks || [] }
          : {}),
      };
    },

    /**
     * Delete form - Used by form deletion
     */
    delete: async (args) => {
      console.log("[Mock Prisma] form.delete called with:", args);

      const formId = args.where.id;
      const currentForm = getFormById(formId);

      if (!currentForm) {
        return null;
      }

      // Remove formblocks associated with this form
      mockDatabase.blocks = mockDatabase.blocks.filter(
        (block) => block.formId !== formId,
      );

      // Remove submissions associated with this form
      mockDatabase.submissions = mockDatabase.submissions.filter(
        (submission) => submission.formId !== formId,
      );

      // Remove the form itself
      mockDatabase.forms = mockDatabase.forms.filter(
        (form) => form.id !== formId,
      );

      return currentForm;
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
      return mockDatabase.forms.length;
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

      // Filter by formId if provided
      const formId = args?.where?.formId;
      const submissions = formId
        ? getSubmissionsForForm(formId)
        : [...mockDatabase.submissions];

      // Apply orderBy
      if (args?.orderBy?.submittedAt === "desc") {
        submissions.sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime(),
        );
      } else if (args?.orderBy?.submittedAt === "asc") {
        submissions.sort(
          (a, b) =>
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime(),
        );
      }

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

      const submissionId = `submission-${Date.now()}`;
      const submittedAt = new Date();

      // Extract responses from nested create
      const responsesData = args.data.responses?.create || [];

      const newSubmission = {
        id: submissionId,
        formId: args.data.formId,
        submittedAt: submittedAt.toISOString(),
        responses: responsesData.map((response: any) => ({
          blockId: response.blockId,
          value: response.value,
        })),
      };

      // Add to mockDatabase
      mockDatabase.submissions.push(newSubmission);

      // Return in expected format with include
      const result: any = {
        id: newSubmission.id,
        formId: newSubmission.formId,
        submittedAt: new Date(newSubmission.submittedAt),
      };

      // Add responses if include is requested
      if (args.include?.responses) {
        result.responses = newSubmission.responses.map((response: any) => ({
          id: `response-${submissionId}-${response.blockId}`,
          blockId: response.blockId,
          submissionId: submissionId,
          value: response.value,
          createdAt: new Date(newSubmission.submittedAt),
        }));
      }

      return result;
    },
  },

  // ============================================
  // Form Block Model (for transactions)
  // ============================================
  formBlock: {
    findMany: async (args?: any) => {
      console.log("[Mock Prisma] formBlock.findMany called with:", args);

      // Filter by formId if provided
      if (args?.where?.formId) {
        const blocks = getBlocksForForm(args.where.formId);

        // Apply select if provided (e.g., { id: true })
        if (args.select) {
          return blocks.map((block: any) => {
            const selected: any = {};
            Object.keys(args.select).forEach((key) => {
              if (args.select[key]) {
                selected[key] = block[key];
              }
            });
            return selected;
          });
        }

        return blocks;
      }

      return mockDatabase.blocks;
    },

    update: async (args: any) => {
      console.log("[Mock Prisma] formBlock.update called with:", args);

      const blockId = args.where.id;
      const existingBlock = mockDatabase.blocks.find((b) => b.id === blockId);

      if (!existingBlock) {
        throw new Error(`Block with id ${blockId} not found`);
      }

      const updatedBlock = {
        ...existingBlock,
        ...args.data,
        updatedAt: new Date().toISOString(),
      };

      // Update in mockDatabase
      mockDatabase.blocks = mockDatabase.blocks.map((block) =>
        block.id === blockId ? updatedBlock : block,
      );

      return {
        ...updatedBlock,
        createdAt: new Date(updatedBlock.createdAt),
        updatedAt: new Date(updatedBlock.updatedAt),
      };
    },

    create: async (args: any) => {
      console.log("[Mock Prisma] formBlock.create called with:", args);

      const newBlock = {
        id: `block-${Date.now()}-${Math.random()}`,
        formId: args.data.formId,
        type: args.data.type,
        name: args.data.name,
        props: args.data.props,
        order: args.data.order,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mockDatabase
      mockDatabase.blocks.push(newBlock);

      return {
        ...newBlock,
        createdAt: new Date(newBlock.createdAt),
        updatedAt: new Date(newBlock.updatedAt),
      };
    },

    deleteMany: async (args: any) => {
      console.log("[Mock Prisma] formBlock.deleteMany called with:", args);

      // Handle deletion by id array
      if (args?.where?.id?.in) {
        const idsToDelete = args.where.id.in;
        const initialCount = mockDatabase.blocks.length;

        mockDatabase.blocks = mockDatabase.blocks.filter(
          (block) => !idsToDelete.includes(block.id),
        );

        const deletedCount = initialCount - mockDatabase.blocks.length;
        return { count: deletedCount };
      }

      // Handle deletion by formId
      if (args?.where?.formId) {
        const initialCount = mockDatabase.blocks.length;

        mockDatabase.blocks = mockDatabase.blocks.filter(
          (block) => block.formId !== args.where.formId,
        );

        const deletedCount = initialCount - mockDatabase.blocks.length;
        return { count: deletedCount };
      }

      return { count: 0 };
    },
  },

  // ============================================
  // Form Field Response Model (for validation)
  // ============================================
  formFieldResponse: {
    count: async (args?: any) => {
      console.log("[Mock Prisma] formFieldResponse.count called with:", args);

      // If no where clause, return total count
      if (!args?.where) {
        return mockDatabase.submissions.reduce((total, submission) => {
          return total + submission.responses.length;
        }, 0);
      }

      // Handle blockId filtering (used in PUT route to check if blocks have responses)
      if (args.where.blockId?.in) {
        const blockIds = args.where.blockId.in;
        return mockDatabase.submissions.reduce((total, submission) => {
          const matchingResponses = submission.responses.filter((response) =>
            blockIds.includes(response.blockId),
          );
          return total + matchingResponses.length;
        }, 0);
      }

      // Default: return 0 for unhandled filters
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

/**
 * Mock data central export
 * All mock data for offline development
 */

export { mockForms } from "./forms";
export { mockBlocks } from "./blocks";
export { mockSubmissions } from "./submissions";
export { mockUser } from "./users";

// Helper functions to access mock data
import { mockForms } from "./forms";
import { mockBlocks } from "./blocks";
import { mockSubmissions } from "./submissions";

/**
 * Get form by ID
 */
export function getFormById(id: string) {
  return mockForms.find((f) => f.id === id) || null;
}

/**
 * Get form by slug
 */
export function getFormBySlug(slug: string) {
  return mockForms.find((f) => f.slug === slug) || null;
}

/**
 * Get blocks for a form
 */
export function getBlocksForForm(formId: string) {
  return mockBlocks.filter((block) => block.formId === formId);
}

/**
 * Get submissions for a form
 */
export function getSubmissionsForForm(formId: string) {
  return mockSubmissions.filter((s) => s.formId === formId);
}

/**
 * Get submission by ID
 */
export function getSubmissionById(id: string) {
  return mockSubmissions.find((s) => s.id === id) || null;
}

/**
 * Get published forms
 */
export function getPublishedForms() {
  return mockForms.filter((f) => f.status === "published");
}

/**
 * Get draft forms
 */
export function getDraftForms() {
  return mockForms.filter((f) => f.status === "draft");
}

/**
 * Get mock stats
 */
export function getMockStats() {
  return {
    totalForms: mockForms.length,
    publishedForms: getPublishedForms().length,
    draftForms: getDraftForms().length,
    totalSubmissions: mockSubmissions.length,
    totalBlocks: mockBlocks.length,
  };
}

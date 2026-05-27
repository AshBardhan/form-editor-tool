// Shared enums for form theme and status
export enum FormTheme {
  Light = "light",
  Dark = "dark",
}

export enum FormStatus {
  Draft = "draft",
  Published = "published",
}
/**
 * Form Metric Labels
 * Maps metric keys to their display labels
 */
export const formMetricLabel: Record<string, string> = {
  fields: "Blocks",
  submissions: "Submissions",
  completion: "Completion",
};

/**
 * Analysis data for a single field across all submissions
 */
export interface FieldData {
  blockId: string;
  blockName: string;
  blockType: string;
  label: string;
  responses: (string | number | boolean | string[] | null)[];
  responseCount: number;
  responseRate: number;
}

/**
 * Analyzed choice data (for radio, select, checkbox fields)
 */
export interface ChoiceAnalysisItem {
  value: string;
  count: number;
  percentage: string;
}

/**
 * Result of field analysis - either choices or list of values
 */
export type FieldAnalysisResult =
  | { type: "choices"; data: ChoiceAnalysisItem[] }
  | { type: "list"; data: (string | number | boolean | string[])[] };

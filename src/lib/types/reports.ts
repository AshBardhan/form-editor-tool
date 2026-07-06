import { type FormBlockType } from "./form";

/**
 * Analysis data for a single field across all submissions
 */
export interface FieldData {
  blockId: string;
  blockName: string;
  blockType: FormBlockType;
  label: string;
  responses: (string | number | boolean | string[] | null)[];
  responded: number;
  skipped: number;
  required: boolean;
  options?: string[];
}

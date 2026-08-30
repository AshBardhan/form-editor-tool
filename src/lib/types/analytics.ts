import { type FormBlock, type FormBlockType, type FormAnalyticsMetrics } from "./form";

/**
 * One field answer. A submission is the fill; a response is a value for one block.
 */
export interface FormFieldResponseValue {
  blockId: string;
  value: string | number | boolean | string[] | null;
}

export interface FormAnalyticsOverviewData {
  form: {
    id: string;
    title: string;
  };
  metrics: FormAnalyticsMetrics;
}

export interface FormFieldAnalysisData {
  form: {
    id: string;
    title: string;
  };
  fieldBlocks: FormBlock[];
  submissionCount: number;
  responses: FormFieldResponseValue[];
}

export interface FormSubmissionListItem {
  id: string;
  submittedAt: string;
  responses: FormFieldResponseValue[];
}

export interface FormSubmissionsListData {
  form: {
    id: string;
    slug: string;
    title: string;
  };
  fieldBlocks: FormBlock[];
  submissions: FormSubmissionListItem[];
}

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

import { AppText } from "@/design-system/app/AppText";
import { type FormBlock } from "@/lib/types/form";
import { type FormSubmissionListItem } from "@/lib/types/analytics";
import { getFieldBlockLabel } from "@/lib/utils/formUtils";

interface SubmissionDetailProps {
  fieldBlocks: FormBlock[];
  submission: FormSubmissionListItem;
}

function formatResponseValue(
  value: string | number | boolean | string[] | null | undefined,
): string {
  if (value === null || value === undefined) {
    return "No response recorded";
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "No response recorded";
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  const asString = String(value).trim();
  return asString.length > 0 ? asString : "No response recorded";
}

export function SubmissionDetail({
  fieldBlocks,
  submission,
}: SubmissionDetailProps) {
  const responsesByBlockId = new Map(
    submission.responses.map((response) => [response.blockId, response.value]),
  );

  if (fieldBlocks.length === 0) {
    return (
      <AppText variant="p" className="text-sm text-app-fg-muted">
        No input fields on this form.
      </AppText>
    );
  }

  return (
    <div className="space-y-4">
      {fieldBlocks.map((block, index) => {
        const value = responsesByBlockId.get(block.id);
        const isSkipped = value === null || value === undefined;
        const isLast = index === fieldBlocks.length - 1;

        return (
          <div
            key={block.id}
            className={`space-y-2 ${!isLast && "border-b border-border pb-4"}`}
          >
            <AppText variant="h5">{getFieldBlockLabel(block)}</AppText>
            <AppText
              variant="p"
              className={
                isSkipped ? "text-app-fg-muted" : "text-app-fg-primary"
              }
            >
              {formatResponseValue(value)}
            </AppText>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { JSX } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface FormPreviewHeaderProps {
  formTitle: string;
  formId?: string;
}

/**
 * Form Preview Header
 * - Displays form title and navigation
 * - Provides navigation back to the form builder
 *
 * @param {FormPreviewHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewHeader = ({
  formTitle,
  formId,
}: FormPreviewHeaderProps): JSX.Element => {
  const backUrl = formId ? `/forms/${formId}` : "/forms/new";

  return (
    <div className="flex items-center h-full">
      {/* Back Button */}
      <div className="shrink-0 w-50 flex items-center gap-2">
        <Button variant="ghost" asChild className="hover:bg-[#1f1f1f]">
          <Link href={backUrl}>
            <ArrowLeftIcon size={20} />
          </Link>
        </Button>
      </div>
      {/* Form Title */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <h1 className="font-semibold text-xl">{formTitle}</h1>
        <Badge label="Preview" variant="info" size="sm" />
      </div>
      {/* Empty right section for balance */}
      <div className="shrink-0 w-50" />
    </div>
  );
};

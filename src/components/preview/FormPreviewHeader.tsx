"use client";

import { JSX } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormConfig } from "@/lib/types/form";

interface FormPreviewHeaderProps {
  form: FormConfig;
}

/**
 * Form Preview Header
 * - Displays form title and navigation
 * - Provides navigation back to the form builder or closes the tab
 *
 * @param {FormPreviewHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormPreviewHeader = ({
  form,
}: FormPreviewHeaderProps): JSX.Element => {
  const router = useRouter();

  const handleBack = () => {
    // If this tab was opened fresh (no prior history), close it
    // Otherwise navigate back in history
    if (window.history.length <= 1) {
      window.close();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center h-full">
      {/* Back Button */}
      <div className="shrink-0 w-50 flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="hover:bg-[#1f1f1f]"
        >
          <ArrowLeftIcon size={20} />
        </Button>
      </div>
      {/* Form Title */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <h1 className="font-semibold text-xl">{form.title}</h1>
        <Badge label="Preview" variant="info" size="sm" />
      </div>
      {/* Empty right section for balance */}
      <div className="shrink-0 w-50" />
    </div>
  );
};

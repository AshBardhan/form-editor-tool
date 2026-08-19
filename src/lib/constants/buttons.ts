import { ButtonAlignment } from "@/lib/types/form";

/**
 * Alignment options for the form-wide submit/reset action buttons, shared between the
 * Configuration Panel select and any future consumers.
 */
export const BUTTON_ALIGNMENT_OPTIONS: {
  value: ButtonAlignment;
  label: string;
}[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "justified", label: "Justified" },
];

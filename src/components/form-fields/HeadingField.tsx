import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { JSX } from "react";

export const HeadingField = ({ field }: { field: FormField }) => {
  const text = getPropValue(field, "text");
  const level = Math.min(Math.max(getPropValue(field, "level") || 1, 1), 6);
  const headingStyles: Record<number, string> = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-bold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={`py-2 ${headingStyles[level]}`}>{text}</HeadingTag>
  );
};

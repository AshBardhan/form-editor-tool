import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";
import { JSX } from "react";

export const HeadingField = ({ field }: { field: Field }) => {
  const text = getPropValue(field, "text");
  const level = Math.min(Math.max(getPropValue(field, "level") || 1, 1), 6);

  const headingStyles: Record<number, string> = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={`font-bold ${headingStyles[level]}`}>
      {text}
    </HeadingTag>
  );
};

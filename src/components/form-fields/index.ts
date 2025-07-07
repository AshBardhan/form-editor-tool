import { JSX } from "react";
import { Field } from "@/types/field";
import { HeadingField } from "./HeadingField";
import { ParagraphField } from "./ParagraphField";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { CheckboxField } from "./CheckboxField";

type FieldRenderer = (props: { field: Field }) => JSX.Element;

export const fieldRenderers: Record<string, FieldRenderer> = {
  heading: HeadingField,
  paragraph: ParagraphField,
  text: InputField,
  textarea: TextareaField,
  checkbox: CheckboxField,
};

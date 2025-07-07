import { JSX } from "react";
import { Field } from "@/types/field";
import { HeadingField } from "./HeadingField";
import { ParagraphField } from "./ParagraphField";
import { TextField } from "./TextField";
import { TextareaField } from "./TextareaField";
import { CheckboxField } from "./CheckboxField";

type FieldRenderer = (props: { field: Field }) => JSX.Element;

export const fieldRenderers: Record<string, FieldRenderer> = {
  heading: HeadingField,
  paragraph: ParagraphField,
  text: TextField,
  textarea: TextareaField,
  checkbox: CheckboxField,
};

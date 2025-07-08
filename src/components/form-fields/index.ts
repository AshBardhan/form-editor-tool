import { JSX } from "react";
import { FormField } from "@/types/field";
import { HeadingField } from "./HeadingField";
import { ParagraphField } from "./ParagraphField";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { CheckboxField } from "./CheckboxField";

type FieldRenderer = (props: { field: FormField }) => JSX.Element;

export const fieldRenderers: Record<string, FieldRenderer> = {
  heading: HeadingField,
  paragraph: ParagraphField,
  text: InputField,
  number: InputField,
  email: InputField,
  password: InputField,
  url: InputField,
  textarea: TextareaField,
  checkbox: CheckboxField,
};

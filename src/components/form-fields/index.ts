import { JSX } from "react";
import { BaseFieldType, FormField } from "@/types/field";
import { HeadingField } from "./HeadingField";
import { ParagraphField } from "./ParagraphField";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";

type FieldRenderer = (props: { field: FormField }) => JSX.Element;

export const fieldRenderers: Record<BaseFieldType, FieldRenderer> = {
  heading: HeadingField,
  paragraph: ParagraphField,
  text: InputField,
  number: InputField,
  email: InputField,
  password: InputField,
  url: InputField,
  textarea: TextareaField,
  checkbox: CheckboxField,
  select: SelectField,
};

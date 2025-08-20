import { JSX } from "react";
import { FormFieldType, FormField } from "@/types/form-field";
import { HeadingField } from "./HeadingField";
import { ParagraphField } from "./ParagraphField";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { SeparatorField } from "./SeparatorField";
import { ButtonField } from "./ButtonField";
import { RadioField } from "./RadioField";

/**
 * Type definition for a field renderer function.
 * @typedef {Function} FieldRenderer
 * @param {Object} props - The properties for the field renderer.
 * @param {FormField} props.field - The form field data.
 * @returns {JSX.Element} The rendered field component.
 */
type FieldRenderer = (props: { field: FormField }) => JSX.Element;

/**
 * A mapping of base field types to their corresponding renderer components.
 * @type {Record<FormFieldType, FieldRenderer>}
 */
export const fieldRenderers: Record<FormFieldType, FieldRenderer> = {
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
  radio: RadioField,
  separator: SeparatorField,
  button: ButtonField,
};

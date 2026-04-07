import { JSX } from "react";
import { FormBlockType, FormBlock } from "@/lib/types/form";
import { HeadingBlock } from "./HeadingBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { InputBlock } from "./InputBlock";
import { TextareaBlock } from "./TextareaBlock";
import { CheckboxBlock } from "./CheckboxBlock";
import { SelectBlock } from "./SelectBlock";
import { SeparatorBlock } from "./SeparatorBlock";
import { ButtonBlock } from "./ButtonBlock";
import { RadioBlock } from "./RadioBlock";

/**
 * Type definition for a block renderer function.
 * @typedef {Function} BlockRenderer
 * @param {Object} props - The properties for the block renderer.
 * @param {FormBlock} props.block - The form block data.
 * @returns {JSX.Element} The rendered block component.
 */
type WidgetBlockRenderer = (props: { block: FormBlock }) => JSX.Element;

/**
 * A mapping of base block types to their corresponding renderer components.
 * @type {Record<FormBlockType, WidgetBlockRenderer>}
 */
export const widgetBlockRenderers: Record<FormBlockType, WidgetBlockRenderer> =
  {
    heading: HeadingBlock,
    paragraph: ParagraphBlock,
    text: InputBlock,
    number: InputBlock,
    email: InputBlock,
    password: InputBlock,
    url: InputBlock,
    textarea: TextareaBlock,
    checkbox: CheckboxBlock,
    select: SelectBlock,
    radio: RadioBlock,
    separator: SeparatorBlock,
    button: ButtonBlock,
  };

import { z } from "zod";

/**
 * Creates a Zod schema for a required string with a custom label.
 * @param {string} [label="This block"] - The label for the block.
 * @returns {z.ZodString} A Zod schema for a required string.
 */
const requiredString = (label = "This block") =>
  z.string().min(1, `${label} is required`);

/** Zod schemas for primitive data types. */
const optionalString = z.string().optional();
const optionalNumber = z.number().optional();
const nonNegativeNumber = z
  .number()
  .min(0, "A non-negative number is required");
const nonNegativeOptionalNumber = nonNegativeNumber.optional();

/**
 * A collection of Zod schemas for different form block types.
 */
export const formBlockSchemas: Record<string, z.ZodSchema> = {
  heading: z.object({
    text: requiredString("Heading text"),
    level: z
      .number()
      .min(1, "Only h1-h6 are allowed")
      .max(6, "Only h1-h6 are allowed"),
  }),

  paragraph: z.object({
    text: requiredString("Paragraph text"),
  }),

  text: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    placeholder: optionalString,
    maxLength: nonNegativeOptionalNumber,
    required: z.boolean(),
  }),

  number: z
    .object({
      label: requiredString("Label"),
      key: requiredString("Key"),
      placeholder: optionalString,
      min: optionalNumber,
      max: optionalNumber,
      step: nonNegativeOptionalNumber,
      required: z.boolean(),
    })
    .refine(
      (data) =>
        data.min === undefined ||
        data.max === undefined ||
        data.min <= data.max,
      {
        path: ["max"],
        message: "Maximum value must be greater than or equal to minimum value",
      },
    ),

  email: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    placeholder: optionalString,
    required: z.boolean(),
  }),

  password: z
    .object({
      label: requiredString("Label"),
      key: requiredString("Key"),
      placeholder: optionalString,
      minLength: nonNegativeOptionalNumber,
      maxLength: z.number().min(1).optional(),
      required: z.boolean(),
    })
    .refine(
      (data) =>
        data.minLength === undefined ||
        data.maxLength === undefined ||
        data.minLength <= data.maxLength,
      {
        path: ["maxLength"],
        message: "Max length must be greater than or equal to min length",
      },
    ),

  url: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    placeholder: optionalString,
    required: z.boolean(),
  }),

  textarea: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    placeholder: optionalString,
    rows: nonNegativeOptionalNumber,
    maxLength: nonNegativeOptionalNumber,
    required: z.boolean(),
  }),

  checkbox: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    required: z.boolean(),
  }),

  radio: z.object({
    key: requiredString("Key"),
    orientation: z.enum(["vertical", "horizontal"]),
    options: z
      .array(requiredString("Radio option"))
      .min(2, "At least two radio options are required"),
  }),

  select: z.object({
    label: requiredString("Label"),
    key: requiredString("Key"),
    required: z.boolean(),
    placeholder: optionalString,
    options: z
      .array(requiredString("Select option"))
      .min(1, "At least one select option is required"),
  }),

  separator: z.object({
    spacing: nonNegativeNumber,
    divider: z.boolean(),
  }),

  button: z.object({
    title: requiredString("Title"),
    level: z.enum(["primary", "secondary"]),
    position: z.enum(["left", "center", "right"]),
  }),

  buttons: z.object({
    submitLabel: requiredString("Submit button label"),
    submitTheme: z.enum(["primary", "secondary", "outline", "destructive"]),
    resetLabel: requiredString("Reset button label"),
    resetTheme: z.enum(["primary", "secondary", "outline", "destructive"]),
    alignment: z.enum(["left", "center", "right", "justified"]),
    reverse: z.boolean(),
  }),
};

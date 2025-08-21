import { FormData } from "@/types/form-field";

export const sampleForm: FormData = {
  title: "Profile Settings Form",
  theme: "light",
  fields: [
    {
      id: "n0qBHYAWA8JUIbb_Y-i64",
      type: "heading",
      name: "heading-n0qBHYAWA8JUIbb_Y-i64",
      props: [
        {
          key: "text",
          label: "Text",
          type: "string",
          value: "Profile Settings",
        },
        {
          key: "level",
          label: "Heading Level",
          type: "number",
          value: 1,
        },
      ],
    },
    {
      id: "R2IleROYA6IoQssJEhx9v",
      type: "paragraph",
      name: "paragraph-R2IleROYA6IoQssJEhx9v",
      props: [
        {
          key: "text",
          label: "Text",
          type: "long-string",
          value: "Please enter your personal details",
        },
      ],
    },
    {
      id: "TL6UZhKbJoyMSpjbJeIvx",
      type: "text",
      name: "text-TL6UZhKbJoyMSpjbJeIvx",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "Name",
        },
        {
          key: "placeholder",
          label: "Placeholder",
          type: "string",
          value: "",
        },
        {
          key: "maxLength",
          label: "Max Length",
          type: "number",
          value: 100,
        },
        {
          key: "required",
          label: "Required",
          type: "boolean",
          value: true,
        },
      ],
    },
    {
      id: "wui3rL6h-MGuaAVckeVAd",
      type: "number",
      name: "number-wui3rL6h-MGuaAVckeVAd",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "Age",
        },
        {
          key: "placeholder",
          label: "Placeholder",
          type: "string",
          value: "",
        },
        {
          key: "min",
          label: "Minimum",
          type: "number",
          value: 1,
        },
        {
          key: "max",
          label: "Maximum",
          type: "number",
          value: 100,
        },
        {
          key: "step",
          label: "Step",
          type: "number",
          value: 1,
        },
        {
          key: "required",
          label: "Required",
          type: "boolean",
          value: true,
        },
      ],
    },
    {
      id: "kym1XtkOZ8UOCOpJI2eo4",
      type: "select",
      name: "select-kym1XtkOZ8UOCOpJI2eo4",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "Occupation",
        },
        {
          key: "required",
          label: "Required",
          type: "boolean",
          value: false,
        },
        {
          key: "placeholder",
          label: "Placeholder",
          type: "string",
          value: "Choose from the list",
        },
        {
          key: "options",
          label: "Options",
          type: "list",
          value: ["Developer", "Manager", "Others"],
        },
      ],
    },
    {
      id: "hSVirOotZtjb-A_lB7fCX",
      type: "heading",
      name: "heading-hSVirOotZtjb-A_lB7fCX",
      props: [
        {
          key: "text",
          label: "Text",
          type: "string",
          value: "Gender",
        },
        {
          key: "level",
          label: "Heading Level",
          type: "number",
          value: 6,
        },
      ],
    },
    {
      id: "J11-aGpVAvdJMXD514G_j",
      type: "radio",
      name: "radio-J11-aGpVAvdJMXD514G_j",
      props: [
        {
          key: "alignment",
          label: "Alignment",
          type: "select",
          value: "horizontal",
        },
        {
          key: "options",
          label: "Options",
          type: "list",
          value: ["Male", "Female", "Prefer not to say"],
        },
      ],
    },
    {
      id: "fqkcKVJ7Q69c5SpZ-_J8G",
      type: "separator",
      name: "separator-fqkcKVJ7Q69c5SpZ-_J8G",
      props: [
        {
          key: "spacing",
          label: "Spacing",
          type: "number",
          value: 10,
        },
        {
          key: "divider",
          label: "Divider",
          type: "boolean",
          value: false,
        },
      ],
    },
    {
      id: "NnnyO7bxtc0jw0B9NJKnq",
      type: "checkbox",
      name: "checkbox-NnnyO7bxtc0jw0B9NJKnq",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "I accept terms and conditions",
        },
        {
          key: "required",
          label: "Required",
          type: "boolean",
          value: true,
        },
      ],
    },
    {
      id: "UqTdVWeMoF970F8y2O6Pt",
      type: "button",
      name: "button-UqTdVWeMoF970F8y2O6Pt",
      props: [
        {
          key: "title",
          label: "Title",
          type: "string",
          value: "Submit",
        },
        {
          key: "level",
          label: "Level",
          type: "select",
          value: "primary",
        },
        {
          key: "position",
          label: "Position",
          type: "select",
          value: "left",
        },
      ],
    },
  ],
};

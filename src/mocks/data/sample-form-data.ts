import { FormData } from "@/types/form.types";

export const sampleLightForm: FormData = {
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

export const sampleDarkForm: FormData = {
  title: "Dark Settings Form",
  theme: "dark",
  fields: [
    {
      id: "hdr1-dark",
      type: "heading",
      name: "heading-hdr1-dark",
      props: [
        {
          key: "text",
          label: "Text",
          type: "string",
          value: "Dark Mode Preferences",
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
      id: "pgh1-dark",
      type: "paragraph",
      name: "paragraph-pgh1-dark",
      props: [
        {
          key: "text",
          label: "Text",
          type: "long-string",
          value: "Customize your experience with dark theme options.",
        },
      ],
    },
    {
      id: "sep1-dark",
      type: "separator",
      name: "separator-sep1-dark",
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
      id: "select-contrast",
      type: "select",
      name: "select-contrast",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "Contrast Level",
        },
        {
          key: "placeholder",
          label: "Placeholder",
          type: "string",
          value: "Choose a level",
        },
        {
          key: "options",
          label: "Options",
          type: "list",
          value: ["Low", "Medium", "High"],
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
      id: "hdr4-dark",
      type: "heading",
      name: "heading-hdr4-dark",
      props: [
        {
          key: "text",
          label: "Text",
          type: "string",
          value: "Select Size",
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
      id: "radio-fontsize",
      type: "radio",
      name: "radio-fontsize",
      props: [
        {
          key: "alignment",
          label: "Alignment",
          type: "select",
          value: "vertical",
        },
        {
          key: "options",
          label: "Options",
          type: "list",
          value: ["Small", "Default", "Large"],
        },
      ],
    },
    {
      id: "sep2-dark",
      type: "separator",
      name: "separator-sep2-dark",
      props: [
        {
          key: "spacing",
          label: "Spacing",
          type: "number",
          value: 20,
        },
        {
          key: "divider",
          label: "Divider",
          type: "boolean",
          value: true,
        },
      ],
    },
    {
      id: "chk-notifications",
      type: "checkbox",
      name: "checkbox-chk-notifications",
      props: [
        {
          key: "label",
          label: "Label",
          type: "string",
          value: "Enable dark mode notifications",
        },
        {
          key: "required",
          label: "Required",
          type: "boolean",
          value: false,
        },
      ],
    },
    {
      id: "btn-save",
      type: "button",
      name: "button-btn-save",
      props: [
        {
          key: "title",
          label: "Title",
          type: "string",
          value: "Save Settings",
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
          value: "right",
        },
      ],
    },
  ],
};

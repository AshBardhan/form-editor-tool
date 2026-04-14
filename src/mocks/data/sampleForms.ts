import { FormConfig } from "@/lib/types/form";

export const sampleLightForm: FormConfig = {
  id: "123",
  title: "Profile Settings Form",
  theme: "light",
  blocks: [
    {
      id: "n0qBHYAWA8JUIbb_Y-i64",
      type: "heading",
      name: "heading-n0qBHYAWA8JUIbb_Y-i64",
      props: {
        text: "Profile Settings",
        level: 1,
      },
    },
    {
      id: "R2IleROYA6IoQssJEhx9v",
      type: "paragraph",
      name: "paragraph-R2IleROYA6IoQssJEhx9v",
      props: {
        text: "Please enter your personal details",
      },
    },
    {
      id: "TL6UZhKbJoyMSpjbJeIvx",
      type: "text",
      name: "text-TL6UZhKbJoyMSpjbJeIvx",
      props: {
        label: "Name",
        key: "name",
        placeholder: "",
        maxLength: 100,
        required: true,
      },
    },
    {
      id: "wui3rL6h-MGuaAVckeVAd",
      type: "number",
      name: "number-wui3rL6h-MGuaAVckeVAd",
      props: {
        label: "Age",
        key: "age",
        placeholder: "",
        min: 1,
        max: 100,
        step: 1,
        required: true,
      },
    },
    {
      id: "kym1XtkOZ8UOCOpJI2eo4",
      type: "select",
      name: "select-kym1XtkOZ8UOCOpJI2eo4",
      props: {
        label: "Occupation",
        key: "occupation",
        required: false,
        placeholder: "Choose from the list",
        options: ["Developer", "Manager", "Others"],
      },
    },
    {
      id: "hSVirOotZtjb-A_lB7fCX",
      type: "heading",
      name: "heading-hSVirOotZtjb-A_lB7fCX",
      props: {
        text: "Gender",
        level: 6,
      },
    },
    {
      id: "J11-aGpVAvdJMXD514G_j",
      type: "radio",
      name: "radio-J11-aGpVAvdJMXD514G_j",
      props: {
        key: "gender",
        alignment: "horizontal",
        options: ["Male", "Female", "Prefer not to say"],
      },
    },
    {
      id: "fqkcKVJ7Q69c5SpZ-_J8G",
      type: "separator",
      name: "separator-fqkcKVJ7Q69c5SpZ-_J8G",
      props: {
        spacing: 10,
        divider: false,
      },
    },
    {
      id: "NnnyO7bxtc0jw0B9NJKnq",
      type: "checkbox",
      name: "checkbox-NnnyO7bxtc0jw0B9NJKnq",
      props: {
        label: "I accept terms and conditions",
        key: "accept-terms",
        required: true,
      },
    },
    {
      id: "UqTdVWeMoF970F8y2O6Pt",
      type: "buttons",
      name: "buttons-UqTdVWeMoF970F8y2O6Pt",
      props: {
        submitLabel: "Submit",
        submitTheme: "primary",
        resetLabel: "Reset",
        resetTheme: "outline",
        alignment: "left",
        reverse: false,
      },
    },
  ],
};

export const sampleDarkForm: FormConfig = {
  id: "666",
  title: "Dark Settings Form",
  theme: "dark",
  blocks: [
    {
      id: "hdr1-dark",
      type: "heading",
      name: "heading-hdr1-dark",
      props: {
        text: "Dark Mode Preferences",
        level: 1,
      },
    },
    {
      id: "pgh1-dark",
      type: "paragraph",
      name: "paragraph-pgh1-dark",
      props: {
        text: "Customize your experience with dark theme options.",
      },
    },
    {
      id: "sep1-dark",
      type: "separator",
      name: "separator-sep1-dark",
      props: {
        spacing: 10,
        divider: false,
      },
    },
    {
      id: "select-contrast",
      type: "select",
      name: "select-contrast",
      props: {
        label: "Contrast Level",
        key: "contrast-level",
        placeholder: "Choose a level",
        options: ["Low", "Medium", "High"],
        required: true,
      },
    },
    {
      id: "hdr4-dark",
      type: "heading",
      name: "heading-hdr4-dark",
      props: {
        text: "Select Size",
        level: 6,
      },
    },
    {
      id: "radio-fontsize",
      type: "radio",
      name: "radio-fontsize",
      props: {
        key: "font-size",
        alignment: "vertical",
        options: ["Small", "Default", "Large"],
      },
    },
    {
      id: "sep2-dark",
      type: "separator",
      name: "separator-sep2-dark",
      props: {
        spacing: 20,
        divider: true,
      },
    },
    {
      id: "chk-notifications",
      type: "checkbox",
      name: "checkbox-chk-notifications",
      props: {
        label: "Enable dark mode notifications",
        key: "enable-notifications",
        required: false,
      },
    },
    {
      id: "btn-save",
      type: "buttons",
      name: "buttons-btn-save",
      props: {
        submitLabel: "Save Settings",
        submitTheme: "primary",
        resetLabel: "Cancel",
        resetTheme: "secondary",
        alignment: "right",
        reverse: true,
      },
    },
  ],
};

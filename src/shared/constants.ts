/** A semantic color group — bg / text / border / ring for one intent. */
export type ColorGroup = {
  name: string;
  label: string;
  description: string;
  bg: string;
  text: string;
  border: string;
  ring?: string;
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    name: "primary",
    label: "Primary",
    description: "Default surfaces, body text, main borders",
    bg: "--color-background-primary",
    text: "--color-text-primary",
    border: "--color-border-primary",
    ring: "--color-ring-primary",
  },
  {
    name: "secondary",
    label: "Secondary",
    description: "Subtle surfaces, captions, lighter borders",
    bg: "--color-background-secondary",
    text: "--color-text-secondary",
    border: "--color-border-secondary",
    ring: "--color-ring-secondary",
  },
  {
    name: "tertiary",
    label: "Tertiary",
    description: "Muted backgrounds, placeholder text, faint borders",
    bg: "--color-background-tertiary",
    text: "--color-text-tertiary",
    border: "--color-border-tertiary",
  },
  {
    name: "inverse",
    label: "Inverse",
    description: "Dark-on-light / light-on-dark contrast flip",
    bg: "--color-background-inverse",
    text: "--color-text-inverse",
    border: "--color-border-inverse",
    ring: "--color-ring-inverse",
  },
  {
    name: "ghost",
    label: "Ghost",
    description: "Transparent / subtle hover states",
    bg: "--color-background-ghost",
    text: "--color-text-ghost",
    border: "--color-border-ghost",
  },
  {
    name: "info",
    label: "Info",
    description: "Informational alerts, links, help text",
    bg: "--color-background-info",
    text: "--color-text-info",
    border: "--color-border-info",
    ring: "--color-ring-info",
  },
  {
    name: "success",
    label: "Success",
    description: "Confirmation, positive actions, saved states",
    bg: "--color-background-success",
    text: "--color-text-success",
    border: "--color-border-success",
    ring: "--color-ring-success",
  },
  {
    name: "warning",
    label: "Warning",
    description: "Caution notices, pending states",
    bg: "--color-background-warning",
    text: "--color-text-warning",
    border: "--color-border-warning",
    ring: "--color-ring-warning",
  },
  {
    name: "danger",
    label: "Danger",
    description: "Errors, destructive actions, validation failures",
    bg: "--color-background-danger",
    text: "--color-text-danger",
    border: "--color-border-danger",
    ring: "--color-ring-danger",
  },
  {
    name: "disabled",
    label: "Disabled",
    description: "Non-interactive / disabled controls",
    bg: "--color-background-disabled",
    text: "--color-text-disabled",
    border: "--color-border-disabled",
  },
];

/** Typography scale entry — size + line-height pair. */
export type TypeScaleEntry = {
  label: string;
  sizeVar: string;
  lineHeightVar: string;
};

export const TEXT_SCALE: TypeScaleEntry[] = [
  { label: "Text XS", sizeVar: "--font-text-xs-size", lineHeightVar: "--font-text-xs-line-height" },
  { label: "Text SM", sizeVar: "--font-text-sm-size", lineHeightVar: "--font-text-sm-line-height" },
  { label: "Text MD", sizeVar: "--font-text-md-size", lineHeightVar: "--font-text-md-line-height" },
  { label: "Text LG", sizeVar: "--font-text-lg-size", lineHeightVar: "--font-text-lg-line-height" },
];

export const HEADING_SCALE: TypeScaleEntry[] = [
  { label: "Heading XS", sizeVar: "--font-heading-xs-size", lineHeightVar: "--font-heading-xs-line-height" },
  { label: "Heading SM", sizeVar: "--font-heading-sm-size", lineHeightVar: "--font-heading-sm-line-height" },
  { label: "Heading MD", sizeVar: "--font-heading-md-size", lineHeightVar: "--font-heading-md-line-height" },
  { label: "Heading LG", sizeVar: "--font-heading-lg-size", lineHeightVar: "--font-heading-lg-line-height" },
  { label: "Heading XL", sizeVar: "--font-heading-xl-size", lineHeightVar: "--font-heading-xl-line-height" },
  { label: "Heading 2XL", sizeVar: "--font-heading-2xl-size", lineHeightVar: "--font-heading-2xl-line-height" },
  { label: "Heading 3XL", sizeVar: "--font-heading-3xl-size", lineHeightVar: "--font-heading-3xl-line-height" },
];

export const FONT_WEIGHTS = [
  { label: "Normal", varName: "--font-weight-normal" },
  { label: "Medium", varName: "--font-weight-medium" },
  { label: "Semibold", varName: "--font-weight-semibold" },
  { label: "Bold", varName: "--font-weight-bold" },
];

export const FONT_FAMILIES = [
  { label: "Sans", varName: "--font-sans" },
  { label: "Mono", varName: "--font-mono" },
];

export const BORDER_RADII = [
  "--border-radius-xs",
  "--border-radius-sm",
  "--border-radius-md",
  "--border-radius-lg",
  "--border-radius-xl",
  "--border-radius-full",
];

export const SHADOWS = [
  "--shadow-hairline",
  "--shadow-sm",
  "--shadow-md",
  "--shadow-lg",
];

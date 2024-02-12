import { version } from "../../../exporter.json";

/**
 * Prefixes for the token category.
 * Only color and measure is implemented now. We need only color and measure now.
 */
export const categoryPrefixes = {
  colorTokenPrefix: "color",
  measureTokenPrefix: "measure",
};

export const actionsNameDefinition = [
  "hover",
  "default",
  "active",
  "disabled",
  "emphasized",
  "muted",
  "contrast",
  "success",
  "danger",
  "warning",
  "info",
  "negative",
  "base",
  "tiny",
  "small",
  "medium",
  "large",
  "extra-large",
  "huge",
  "full",
  "none",
];


/**
 * Definition of the brands (theme) persistentIds.
 */
export const brandIds = {
  vigo: "3e9cc4d7-a217-4562-9543-e291130e324d",
  cpp: "28866b30-0acf-11ee-860e-8d38c625b914",
  koop: "1e242f60-0acf-11ee-9280-55a9d69c41ca",
};

export const brandNames = {
  vigo: "01 - VIGo",
  cpp: "02 - CPP",
  koop: "03 - Koop",
  knz: "04 - KNZ",
  sus: "05 - SUS",
};

/**
 * Current exporter version.
 */
export const currentExporterVersion = version;
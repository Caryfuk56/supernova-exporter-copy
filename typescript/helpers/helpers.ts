import { version } from "../../exporter.json";
import { stringifyOutput } from "./stringifyOutput";
import { brandNames } from "../src/payloads";

/**
 * Return current date and time.
 * @returns {string} - current date and time
 */
export const dateNow = (): string => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return `${date} ${time}`;
};

/**
 * Return file name with path according type and brand.
 * 
 * @param {string}type - type of token group 
 * @param {string}brand - Name of brand. E.g.: 01 - VIGo 
 * @returns 
 */
export const exportedFileName = (type: string, brand: string): string => {
  let folder = "";
  let file = "";

  switch (type) {
    case "colors":
      file = "_colors.scss";
      break;
    case "measures":
      file = "_measures.scss";
      break;
    default:
      console.log("File header comment ERROR: file type \"" + type + "\" doesn't exist.");
      file = "ERROR";
      break;
  }

  switch (brand) {
    case brandNames.vigo:
      folder = "vigo";
      break;
    case brandNames.cpp:
      folder = "cpp";
      break;
    case brandNames.koop:
      folder = "koop";
      break;
    default:
      console.log("File header comment ERROR: Brand name \"" + brand + "\" doesn't exist.");
      file = "ERROR";
      break;
  }

  return `${folder}/${file}`;
};

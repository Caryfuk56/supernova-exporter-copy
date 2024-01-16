import { stringifyOutput } from "../../helpers";

const getBrandId = (name: string, brands: Record<string, unknown>[]): string => {
  const brandObject = brands.filter((brand) => brand.name === name);

  console.log("BRENDS" + stringifyOutput(brands))

  if (brandObject.length === 0) {
    console.log("ERROR: brand with name \"" + name + "\" doesn't exist id design system!");
    return "";
  }

  return brandObject[0].id as string;
};

export default getBrandId;

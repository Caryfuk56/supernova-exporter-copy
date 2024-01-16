import { actionsNameDefinition } from "../payloads";

const replaceIfContains = (source: string, replaceFrom: string, replaceTo: string) => {
  if (source.includes(replaceFrom)) {
    return source.replace(replaceFrom, replaceTo);
  }

  return source;
};

const replaceLastOne = (definition: string[], source: string): string => {
  if (definition.some((item) => source.includes(item))) {
    return `-${source}`;
  }

  return source;
};

/**
 * Generates a variable name by combining prefixes, token information, and token group path.
 *
 * @param {string} prefix - The prefix to prepend to the generated name.
 * @param {Token} token - The token to extract information from.
 * @param {TokenGroup} tokenGroup - The token group to extract path and name information from.
 * @returns {string} The generated variable name.
 */
const variableName = (prefix: string, token: Token, tokenGroup: TokenGroup): string => {
  // Create array with all path segments and token name at the end
  const segments = [...tokenGroup.path];
  if (!tokenGroup.isRoot) {
    segments.push(tokenGroup.name);
  }

  segments.push(token.name);

  segments[segments.length - 1] = replaceLastOne(actionsNameDefinition, segments[segments.length - 1])


  // Create string from sentence array and separate it ba "-" symbol.
  let separatedName = segments.join("-").toLowerCase();

  // If the group contains space remove it.
  const finalResult = separatedName.replace(/\s/g, "")

  return `${prefix}-${finalResult}`;
};

export default variableName;

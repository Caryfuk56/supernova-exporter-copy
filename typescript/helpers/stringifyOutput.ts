export const stringifyOutput = (obj) => {
  let cache: unknown[] | null = [];
  const str = JSON.stringify(obj, (key: string, value: string) => {
    if (typeof value === "object" && value !== null) {
      if (cache && cache.indexOf(value) !== -1) {
        return null;
      }
      cache?.push(value);
    }
    return value;
  });

  cache = null;
  return str;
}

const flattenObject = (
  obj: Record<string, any>,
  delimiter: string = ".",
  prefix: string = ""
): Record<string, any> => {
  const flattObject = Object.keys(obj).reduce<Record<string, any>>((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k]) &&
      Object.keys(obj[k]).length > 0
    ) {
      Object.assign(acc, flattenObject(obj[k], delimiter, `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});

  return flattObject;
};

export { flattenObject };



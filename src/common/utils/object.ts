export const invert = object => {
  return Object.keys(object).reduce((resultObject, key) => ({
    ...resultObject,
    [object[key]]: key,
  }), {});
};
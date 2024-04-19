export const invert = object => {
  return Object.keys(object).reduce((resultObject, key) => ({
    ...resultObject,
    [object[key]]: key,
  }), {});
};

export const pick = (object, props) => {
  if (!props && object instanceof Array) {
    props = object;

    return object => exports.pick(object, props);
  }

  const result = {};

  props.forEach(prop => {
    result[prop] = object[prop];
  });

  return result;
};
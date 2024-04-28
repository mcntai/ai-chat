export const predicates = {
  isUndefined: value => value === undefined,

  //Checks if `value` is `null` or `undefined`.
  isNil: value => value == null,

  isPrimitive: value => value !== Object(value),

  isFalsy: value => !value,
};

export const invert = (object): any => {
  return Object.keys(object).reduce((resultObject, key) => ({
    ...resultObject,
    [object[key]]: key,
  }), {});
};

export const pick = (object, props): any => {
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

type PredicateFunction<T> = (value: T, key: string) => boolean;

export const omitBy = <T>(
  object,
  predicate: PredicateFunction<T> = predicates.isNil,
): any => {
  const result = {};

  for (const prop in object) {
    if (!predicate(object[prop], prop)) {
      result[prop] = object[prop];
    }
  }

  return result;
};
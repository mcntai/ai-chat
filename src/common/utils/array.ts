export const toArray = value => Array.isArray(value) ? value : [value];

export const compact = arr => arr.filter(item => !!item)
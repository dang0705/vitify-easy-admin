const getType = (data, type) =>
  Object.prototype.toString.call(data).slice(8).startsWith(type);
export const helpers = {
  isArray: (data) => getType(data, 'Array'),
  isBoolean: (data) => getType(data, 'Boolean'),
  isObject: (data) => getType(data, 'Object'),
  isString: (data) => getType(data, 'String'),
  isFunction: (data) => getType(data, 'Function'),
  isNumber: (data) => getType(data, 'Number'),
  isEmpty: (data) => data ?? true
};

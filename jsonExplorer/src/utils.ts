import { JSONObject, JSONValue } from "./types";

const isJSONObject = (value: JSONValue): value is JSONObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const getNestedValue = (value: JSONValue, path: string[]): any => {
  if (path.length === 0 || value === undefined || !isJSONObject(value)) {
    return value;
  }

  const [first, ...rest] = path;

  if (!first.includes("[")) {
    return getNestedValue(value[first], rest);
  }

  const [key, index] = first.split(/[\[\]]/).filter(Boolean);

  if (!Array.isArray(value[key])) {
    return getNestedValue(value[key], rest);
  }

  const item = value[key][parseInt(index, 10)];
  return getNestedValue(item, rest);
};

export const isLeaf = (value: JSONValue) => typeof value !== "object" || value === null;


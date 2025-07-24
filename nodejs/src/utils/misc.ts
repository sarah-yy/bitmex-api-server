import { SimpleMap } from "../constants";
import { ValidateFieldArr, ValidateObjStruct, ValueType } from "validate-ts-obj";

export const appendSlash = (path: string): string => {
  return path.startsWith("/") ? path : `/${path}`;
};

export enum ReturnTypes {
  JSON = "application/json",
  Text = "text/plain",
}

const parseReqParam = (value: any, validateItem: ValidateObjStruct) => {
  switch (validateItem.type) {
    case ValueType.Number: return typeof value !== "number" ? Number(value) : value;
    case ValueType.Boolean: return typeof value !== "boolean" ? Boolean(value) : value;
    case ValueType.Array: {
      try {
        const array = JSON.parse(value);
        if (!isArray(array)) {
          throw new Error("not array");
        }
        return array;
      } catch (err) {
        return [];
      }
    }
    case ValueType.DateTime: {
      const dateObj = new Date(value);
      if (dateObj.toString() !== "Invalid Date") {
        return dateObj.toISOString();
      }
      return value;
    }
    default: return value;
  }
};

export const getParsedQueryObj = (queryObj: SimpleMap<any>, validateSchema: ValidateFieldArr) => {
  return validateSchema.reduce((prev: SimpleMap<any>, item: ValidateObjStruct) => {
    if (!Object.prototype.hasOwnProperty.call(queryObj, item.name)) return prev;
    prev[item.name] = parseReqParam(queryObj[item.name], item);
    return prev;
  }, {});
};

export const isArray = (item: any): boolean => {
  if (typeof item !== "object") return false;
  if (!!Array.isArray) return Array.isArray(item);
  return Object.prototype.toString.call(item) === "[object Array]";
};
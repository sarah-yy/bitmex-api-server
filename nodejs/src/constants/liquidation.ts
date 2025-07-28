import { ValidateFieldArr, ValueType } from "validate-ts-obj";

export interface LiquidationObj {
  orderID: string;
  symbol: string;
  side: string;
  price: number;
  leavesQty: number;
}

export interface QueryGetLiquidationsReq {
  symbol?: string;
  columns?: string[];
  count?: number;
  start?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}

export const queryGetLiquidationsSchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
}, {
  name: "columns",
  type: ValueType.Array,
  arrayType: {
    type: ValueType.String,
  },
}, {
  name: "count",
  type: ValueType.Number,
}, {
  name: "start",
  type: ValueType.Number,
}, {
  name: "reverse",
  type: ValueType.Boolean,
}, {
  name: "startTime",
  type: ValueType.DateTime,
}, {
  name: "endTime",
  type: ValueType.DateTime,
}];
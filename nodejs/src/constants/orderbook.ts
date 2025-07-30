import { ValidateFieldArr, ValueType } from "validate-ts-obj";

export interface OrderBookItem {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: string;
  transactTime: string;
}

export interface QueryGetOrderBookReq {
  symbol: string;
  depth?: number;
}

export const defaultGetOrderBookReq: QueryGetOrderBookReq = {
  symbol: "XBT",
};

export const queryGetOrderBookSchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  required: true,
  minLength: 1,
}, {
  name: "depth",
  type: ValueType.Number,
  minNum: 0,
}];
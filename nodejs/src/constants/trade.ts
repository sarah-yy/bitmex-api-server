import { ValidateFieldArr, ValueType } from "validate-ts-obj";

export interface TradeObj {
  timestamp: string;
  symbol: string;
  side: string;
  size: number;
  price: number;
  tickDirection: string;
  trdMatchID: string;
  grossValue: number;
  homeNotional: number;
  foreignNotional: number;
  trdType: string;
}

export interface QueryGetTradesReq {
  symbol?: string;
  columns?: string[];
  count?: number;
  start?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}

export const queryGetTradesSchema: ValidateFieldArr = [{
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

export interface TradeBucketObj {
  timestamp: string;
  symbol: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  trades: number;
  volume: number;
  vwap?: number;
  lastSize?: number;
  turnover?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

export interface QueryGetBucketedTradesReq {
  binSize: "1m" | "5m" | "1h" | "1d";
  partial?: boolean;
  symbol?: string;
  columns?: string[];
  count?: number;
  start?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}

export const defaultGetBucketedTradesReq: QueryGetBucketedTradesReq = {
  binSize: "1h",
};

export const queryGetBucketedTradesSchema: ValidateFieldArr = [{
  name: "binSize",
  type: ValueType.String,
  required: true,
  acceptedValues: ["1m", "5m", "1h", "1d"],
}, {
  name: "partial",
  type: ValueType.Boolean,
}, {
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
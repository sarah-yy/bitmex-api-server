import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { BaseOptionalQueryReq, queryBaseOptionalQuerySchema } from "./request";

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

export type QueryGetTradesReq = BaseOptionalQueryReq;

export const queryGetTradesSchema: ValidateFieldArr = [...queryBaseOptionalQuerySchema];

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

export interface QueryGetBucketedTradesReq extends BaseOptionalQueryReq {
  binSize: "1m" | "5m" | "1h" | "1d";
  partial?: boolean;
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
}, ...queryBaseOptionalQuerySchema];
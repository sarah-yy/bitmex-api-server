import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { BaseOptionalQueryReq, queryBaseOptionalQuerySchema, BaseBucketedQueryReq, defaultBaseBucketedQueryReq, queryBaseBucketedQuerySchema } from "./request";

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

export type QueryGetBucketedTradesReq = BaseBucketedQueryReq;

export const defaultGetBucketedTradesReq: QueryGetBucketedTradesReq = {
  ...defaultBaseBucketedQueryReq,
};

export const queryGetBucketedTradesSchema: ValidateFieldArr = [...queryBaseBucketedQuerySchema];
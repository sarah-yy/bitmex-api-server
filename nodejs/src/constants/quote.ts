import { ValidateFieldArr } from "validate-ts-obj";
import { BaseRequiredQueryReq, queryBaseRequiredQuerySchema, BaseBucketedQueryReq, defaultBaseBucketedQueryReq, queryBaseBucketedQuerySchema } from "./request";

export interface QuoteItem {
  timestamp: string;
  symbol: string;
  bidSize?: number;
  bidPrice?: number;
  askPrice?: number;
  askSize?: number;
}

export type QueryGetQuoteReq = BaseRequiredQueryReq;

export const defaultGetQuoteReq: QueryGetQuoteReq = {
  symbol: "XBT",
};

export const queryGetQuoteSchema: ValidateFieldArr = [...queryBaseRequiredQuerySchema];


export type QueryGetBucketedQuoteReq = BaseBucketedQueryReq;

export const defaultGetBucketedQuoteReq: QueryGetBucketedQuoteReq = {
  ...defaultBaseBucketedQueryReq,
};

export const queryGetBucketedQuoteSchema: ValidateFieldArr = [...queryBaseBucketedQuerySchema];
import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { SimpleMap } from "./types";

export type RequestValue = string | boolean | number;
export type BaseRequest = SimpleMap<RequestValue>;

export interface BaseFilterQueryReq {
  columns?: string[];
  count?: number;
  start?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}

export const queryBaseFilterQuerySchema: ValidateFieldArr = [{
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

export type BaseOptionalQueryReq = BaseFilterQueryReq & {
  symbol?: string;
};

export const queryBaseOptionalQuerySchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  minLength: 1,
}, ...queryBaseFilterQuerySchema];

export type BaseRequiredQueryReq = Omit<BaseOptionalQueryReq, "symbol"> & {
  symbol: string;
};

export const queryBaseRequiredQuerySchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  required: true,
  minLength: 1,
}, ...queryBaseFilterQuerySchema];

export interface BaseBucketedQueryReq extends BaseOptionalQueryReq {
  binSize: "1m" | "5m" | "1h" | "1d";
  partial?: boolean;
}

export const defaultBaseBucketedQueryReq: BaseBucketedQueryReq = {
  binSize: "1h",
};

export const queryBaseBucketedQuerySchema: ValidateFieldArr = [{
  name: "binSize",
  type: ValueType.String,
  required: true,
  acceptedValues: ["1m", "5m", "1h", "1d"],
}, {
  name: "partial",
  type: ValueType.Boolean,
}, ...queryBaseOptionalQuerySchema];

export const PATHS: SimpleMap<SimpleMap<string>> = {
  Guild: {
    All: "/guild",
  },
  Instrument: {
    Active: "/instrument/active",
    ActiveAndIndices: "/instrument/activeAndIndices",
    ActiveIntervals: "/instrument/activeIntervals",
    All: "/instrument",
    CompositeIndex: "/instrument/compositeIndex",
    Indices: "/instrument/indices",
    UsdVolume: "/instrument/usdVolume",
  },
  Insurance: {
    All: "/insurance",
  },
  Leaderboard: {
    All: "/leaderboard",
  },
  Liquidation: {
    All: "/liquidation",
  },
  Funding: {
    All: "/funding",
  },
  Orderbook: {
    L2: "/orderBook/L2",
  },
  Quote: {
    All: "/quote",
    Bucketed: "/quote/bucketed",
  },
  Settlement: {
    History: "/settlement",
  },
  Stats: {
    All: "/stats",
    History: "/stats/history",
    HistoryUSD: "/stats/historyUSD",
  },
  Trade: {
    All: "/trade",
    Bucketed: "/trade/bucketed",
  },
};
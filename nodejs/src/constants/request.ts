import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { SimpleMap } from "./types";

export type RequestValue = string | boolean | number;
export type BaseRequest = SimpleMap<RequestValue>;

export interface BaseOptionalQueryReq {
  symbol?: string;
  columns?: string[];
  count?: number;
  start?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}

export const queryBaseOptionalQuerySchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  minLength: 1,
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

export type BaseRequiredQueryReq = Omit<BaseOptionalQueryReq, "symbol"> & {
  symbol: string;
};

export const queryBaseRequiredQuerySchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  required: true,
  minLength: 1,
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

export const PATHS: SimpleMap<SimpleMap<string>> = {
  Instrument: {
    Active: "/instrument/active",
    ActiveAndIndices: "/instrument/activeAndIndices",
    ActiveIntervals: "/instrument/activeIntervals",
    All: "/instrument",
    CompositeIndex: "/instrument/compositeIndex",
    Indices: "/instrument/indices",
    UsdVolume: "/instrument/usdVolume",
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
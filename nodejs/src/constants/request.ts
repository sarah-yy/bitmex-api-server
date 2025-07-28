import { SimpleMap } from "./types";

export type RequestValue = string | boolean | number;
export type BaseRequest = SimpleMap<RequestValue>;

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
  Funding: {
    All: "/funding",
  },
  Orderbook: {
    L2: "/orderBook/L2",
  },
  Stats: {
    All: "/stats",
    History: "/stats/history",
    HistoryUSD: "/stats/historyUSD",
  },
};
import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { BaseOptionalQueryReq, queryBaseOptionalQuerySchema, BaseRequiredQueryReq, queryBaseRequiredQuerySchema } from "./request";

export type QueryGetInstrumentReq = BaseOptionalQueryReq;

export const queryGetInstrumentSchema: ValidateFieldArr = [...queryBaseOptionalQuerySchema];

export interface Instrument {
  symbol: string;
  rootSymbol: string;
  state: string;
  typ: string;
  listing: string;
  front: string;
  expiry: string;
  settle: string;
  listedSettle: string;
  positionCurrency: string;
  underlying: string;
  quoteCurrency: string;
  underlyingSymbol: string;
  reference: string;
  referenceSymbol: string;
  calcInterval: string;
  publishInterval: string;
  publishTime: string;
  maxOrderQty: number;
  maxPrice: number;
  lotSize: number;
  tickSize: number;
  multiplier: number;
  settlCurrency: string;
  underlyingToPositionMultiplier: number;
  underlyingToSettleMultiplier: number;
  quoteToSettleMultiplier: number;
  isQuanto: boolean;
  isInverse: boolean;
  initMargin: number;
  maintMargin: number;
  riskLimit: number;
  riskStep: number;
  limit: number;
  taxed: boolean;
  deleverage: boolean;
  makerFee: number;
  takerFee: number;
  settlementFee: number;
  fundingBaseSymbol: string;
  fundingQuoteSymbol: string;
  fundingPremiumSymbol: string;
  fundingTimestamp: string;
  fundingInterval: string;
  fundingRate: number;
  indicativeFundingRate: number;
  rebalanceTimestamp: string;
  rebalanceInterval: string;
  prevClosePrice: number;
  limitDownPrice: number;
  limitUpPrice: number;
  totalVolume: number;
  volume: number;
  volume24h: number;
  prevTotalTurnover: number;
  totalTurnover: number;
  turnover: number;
  turnover24h: number;
  homeNotional24h: number;
  foreignNotional24h: number;
  prevPrice24h: number;
  vwap: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  lastPriceProtected: number;
  lastTickDirection: string;
  lastChangePcnt: number;
  bidPrice: number;
  midPrice: number;
  askPrice: number;
  impactBidPrice: number;
  impactMidPrice: number;
  impactAskPrice: number;
  hasLiquidity: boolean;
  openInterest: number;
  openValue: number;
  fairMethod: string;
  fairBasisRate: number;
  fairBasis: number;
  fairPrice: number;
  markMethod: string;
  markPrice: number;
  indicativeSettlePrice: number;
  settledPriceAdjustmentRate: number;
  settledPrice: number;
  instantPnl: boolean;
  minTick: number;
  fundingBaseRate: number;
  fundingQuoteRate: number;
  timestamp: string;
}

export interface QueryGetUsdVolumesReq {
  symbol?: string;
  columns?: string[];
}

export interface UsdVolumeObj {
  symbol: string;
  currency: string;
  turnover24h: number;
  turnover7d?: number;
  turnover30d: number;
  turnoverYTD?: number;
  turnover365d: number;
  turnover: number;
  price24h?: number;
  price7d?: number;
  price30d?: number;
  priceYTD?: number;
  price365d?: number;
  lastPrice?: number;
}

export const queryGetUsdVolumeSchema: ValidateFieldArr = [{
  name: "symbol",
  type: ValueType.String,
  minLength: 1,
}];

export interface ActiveIntervalResponseObj {
  intervals: string[];
  symbols: string[];
}

export type QueryGetCompositeIndexReq = BaseRequiredQueryReq;

export const defaultGetCompositeIndexReq: QueryGetCompositeIndexReq = {
  symbol: ".BXBT",
};

export interface CompositeIndexObj {
  timestamp: string;
  symbol: string;
  indexSymbol: string;
  reference: string;
  lastPrice: number;
  weight: number;
  logged: string;
}

export const queryGetCompositeIndexSchema: ValidateFieldArr = [...queryBaseRequiredQuerySchema];
import { ValidateFieldArr } from "validate-ts-obj";
import { BaseOptionalQueryReq, queryBaseOptionalQuerySchema } from "./request";

export interface SettlementObj {
  timestamp: string;
  symbol: string;
  settlementType: string;
  settledPrice: number;
  optionStrikePrice?: number;
  optionUnderlyingPrice?: number;
  bankrupt?: number;
  taxBase?: number;
  taxRate?: number;
}

export type QueryGetSettlementReq = BaseOptionalQueryReq;

export const queryGetSettlementSchema: ValidateFieldArr = [...queryBaseOptionalQuerySchema];
import { ValidateFieldArr } from "validate-ts-obj";
import { BaseRequiredQueryReq, queryBaseRequiredQuerySchema } from "./request";

export interface FundingItem {
  timestamp: string;
  symbol: string;
  fundingInterval: string;
  fundingRate: number;
  fundingRateDaily: number;
}

export type QueryGetFundingReq = BaseRequiredQueryReq;

export const defaultGetFundingReq: QueryGetFundingReq = {
  symbol: "XBT",
};

export const queryGetFundingSchema: ValidateFieldArr = [...queryBaseRequiredQuerySchema];
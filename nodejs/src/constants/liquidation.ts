import { ValidateFieldArr } from "validate-ts-obj";
import { BaseOptionalQueryReq, queryBaseOptionalQuerySchema } from "./request";

export interface LiquidationObj {
  orderID: string;
  symbol: string;
  side: string;
  price: number;
  leavesQty: number;
}

export type QueryGetLiquidationsReq = BaseOptionalQueryReq;

export const queryGetLiquidationsSchema: ValidateFieldArr = [...queryBaseOptionalQuerySchema];
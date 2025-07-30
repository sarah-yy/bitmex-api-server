import { ValidateFieldArr, ValueType } from "validate-ts-obj";
import { BaseFilterQueryReq, queryBaseFilterQuerySchema } from "./request";

export interface InsuranceObj {
  currency: string;
  timestamp: string;
  walletBalance: number;
}

export interface QueryGetInsuranceReq extends BaseFilterQueryReq {
  currency?: string;
}

export const queryGetInsuranceSchema: ValidateFieldArr = [{
  name: "currency",
  type: ValueType.String,
  minLength: 1,
}, ...queryBaseFilterQuerySchema];
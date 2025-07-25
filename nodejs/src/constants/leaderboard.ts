import { ValidateFieldArr, ValueType } from "validate-ts-obj";

export interface LeaderboardItem {
  name: string;
  isRealName: boolean;
  profit: number;
}

export interface QueryGetLeaderboardReq {
  method: "notional" | "ROE";
}

export const defaultLeaderboardReq: QueryGetLeaderboardReq = {
  method: "notional",
};

export const queryGetLeaderboardSchema: ValidateFieldArr = [{
  name: "method",
  type: ValueType.String,
  required: true,
  acceptedValues: ["notional", "ROE"],
}];
import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetInsuranceReq, queryGetInsuranceSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getInsurance = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetInsuranceSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetInsuranceSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const insurance = await bitmexClient.Insurance(queryObj as QueryGetInsuranceReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(insurance);
};
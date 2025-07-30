import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetFundingReq, queryGetFundingSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getFunding = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetFundingSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetFundingSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const funding = await bitmexClient.Funding(queryObj as QueryGetFundingReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(funding);
};
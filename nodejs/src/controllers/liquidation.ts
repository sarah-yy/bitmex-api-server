import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetLiquidationsReq, queryGetLiquidationsSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getLiquidations = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetLiquidationsSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetLiquidationsSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const liquidations = await bitmexClient.Liquidations(queryObj as QueryGetLiquidationsReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(liquidations);
};
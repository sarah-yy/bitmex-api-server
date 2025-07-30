import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetBucketedTradesReq, queryGetBucketedTradesSchema, QueryGetTradesReq, queryGetTradesSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getTrades = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetTradesSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetTradesSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const trades = await bitmexClient.Trades(queryObj as QueryGetTradesReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(trades);
};

export const getBucketedTrades = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetBucketedTradesSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetBucketedTradesSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const bucketedTrades = await bitmexClient.BucketedTrades(queryObj as QueryGetBucketedTradesReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(bucketedTrades);
};
import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetBucketedQuoteReq, queryGetBucketedQuoteSchema, QueryGetQuoteReq, queryGetQuoteSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getQuotes = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetQuoteSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetQuoteSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const quotes = await bitmexClient.Quote(queryObj as QueryGetQuoteReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(quotes);
};

export const getBucketedQuotes = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetBucketedQuoteSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetBucketedQuoteSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const bucketedQuotes = await bitmexClient.BucketedQuote(queryObj as QueryGetBucketedQuoteReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(bucketedQuotes);
};
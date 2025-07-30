import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetOrderBookReq, queryGetOrderBookSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getOrderbookL2 = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetOrderBookSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetOrderBookSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const orderbookL2 = await bitmexClient.OrderBookL2(queryObj as QueryGetOrderBookReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(orderbookL2);
};
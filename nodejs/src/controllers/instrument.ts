import { Request, Response } from "express";
import { BitmexClient, getConfig, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getInstruments = async (req: Request, res: Response) => {
  console.log("req.query", req.query);
  const instruments = await bitmexClient.Instrument({
    symbol: "FCTM17",
    columns: ["symbol", "listing", "expiry"],
    count: 100,
    start: 0,
    reverse: false,
  });
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(instruments);
};
import { Request, Response } from "express";
import { BitmexClient, getConfig, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getGuild = async (_req: Request, res: Response) => {
  const guild = await bitmexClient.Guild();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(guild);
};
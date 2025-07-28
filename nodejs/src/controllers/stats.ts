import { Request, Response } from "express";
import { BitmexClient, getConfig, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getStats = async (_req: Request, res: Response) => {
  const stats = await bitmexClient.Stats();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(stats);
};

export const getStatsHistory = async (_req: Request, res: Response) => {
  const statsHistory = await bitmexClient.StatsHistory();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(statsHistory);
};

export const getStatsHistoryUSD = async (_req: Request, res: Response) => {
  const statsHistoryUsd = await bitmexClient.StatsHistoryUSD();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(statsHistoryUsd);
};
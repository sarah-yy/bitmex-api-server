import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { defaultLeaderboardReq, QueryGetLeaderboardReq, queryGetLeaderboardSchema, SimpleMap } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getLeaderboard = async (req: Request, res: Response) => {
  let queryObj = getParsedQueryObj(req.query, queryGetLeaderboardSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetLeaderboardSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const leaderboard = await bitmexClient.Leaderboard(queryObj as QueryGetLeaderboardReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(leaderboard);
};
import { Request, Response } from "express";
import { validateBodyObj } from "validate-ts-obj";
import { QueryGetCompositeIndexReq, QueryGetInstrumentReq, QueryGetUsdVolumesReq, UsdVolumeObj, queryGetCompositeIndexSchema, queryGetInstrumentSchema, queryGetUsdVolumeSchema } from "../constants";
import { BitmexClient, getConfig, getParsedQueryObj, ReturnTypes } from "../utils";

const config = getConfig();
if (!config.bitmexApi?.keyId || !config.bitmexApi?.keySecret) {
  console.error("No API key id and/or secret found");
  process.exit(1);
}

const bitmexClient = new BitmexClient(config.bitmexApi.keyId, config.bitmexApi.keySecret);

export const getInstruments = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetInstrumentSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetInstrumentSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }
  if (queryObj.startTime && queryObj.endTime) {
    const startTimestamp = new Date(queryObj.startTime).getTime();
    const endTimestamp = new Date(queryObj.endTime).getTime();
    if (startTimestamp >= endTimestamp) {
      return res.status(403).send("Query params error: Please make sure startTime is strictly earlier than endTime");
    }
  }

  const instruments = await bitmexClient.Instruments(queryObj as QueryGetInstrumentReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(instruments);
};

export const getActiveInstruments = async (_req: Request, res: Response) => {
  const activeInstruments = await bitmexClient.ActiveInstruments();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(activeInstruments);
};

export const getActiveAndIndices = async (_req: Request, res: Response) => {
  const activeAndIndices = await bitmexClient.ActiveAndIndices();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(activeAndIndices);
};

export const getIndices = async (_req: Request, res: Response) => {
  const indices = await bitmexClient.Indices();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(indices);
};

export const getUsdVolume = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetUsdVolumeSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetUsdVolumeSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const usdVolumes = await bitmexClient.UsdVolume(queryObj as QueryGetUsdVolumesReq) as UsdVolumeObj[];
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(usdVolumes);
};

export const getActiveIntervals = async (_req: Request, res: Response) => {
  const activeIntervals = await bitmexClient.ActiveIntervals();
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(activeIntervals);
};

export const getCompositeIndex = async (req: Request, res: Response) => {
  const queryObj = getParsedQueryObj(req.query, queryGetCompositeIndexSchema);
  const validateOutcome = validateBodyObj(queryObj, queryGetCompositeIndexSchema);
  if (typeof validateOutcome === "string") {
    return res.status(403).send(`Query params error: ${validateOutcome}`);
  }

  const compositeIndexes = await bitmexClient.CompositeIndex(queryObj as QueryGetCompositeIndexReq);
  res.status(200).set("Content-Type", ReturnTypes.JSON).send(compositeIndexes);
};
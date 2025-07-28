import Router from "express";
import { PATHS } from "../constants";
import { Trade } from "../controllers";

const router = Router();

router.get(PATHS.Trade.All, Trade.getTrades);
router.get(PATHS.Trade.Bucketed, Trade.getBucketedTrades);

export default router;
import Router from "express";
import { PATHS } from "../constants";
import { Stats } from "../controllers";

const router = Router();

router.get(PATHS.Stats.All, Stats.getStats);
router.get(PATHS.Stats.History, Stats.getStatsHistory);
router.get(PATHS.Stats.HistoryUSD, Stats.getStatsHistoryUSD);

export default router;
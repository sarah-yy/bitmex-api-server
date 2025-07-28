import { Router } from "express";
import fundingRoutes from "./funding";
import instrumentRoutes from "./instrument";
import leaderboardRoutes from "./leaderboard";
import liquidationRoutes from "./liquidation";
import orderbookRoutes from "./orderbook";
import statsRoutes from "./stats";
import tradeRoutes from "./trade";

const router = Router();

router.use(fundingRoutes);
router.use(instrumentRoutes);
router.use(leaderboardRoutes);
router.use(liquidationRoutes);
router.use(orderbookRoutes);
router.use(statsRoutes);
router.use(tradeRoutes);

export default router;
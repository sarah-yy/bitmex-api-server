import { Router } from "express";
import fundingRoutes from "./funding";
import guildRoutes from "./guild";
import instrumentRoutes from "./instrument";
import insuranceRoutes from "./insurance";
import leaderboardRoutes from "./leaderboard";
import liquidationRoutes from "./liquidation";
import orderbookRoutes from "./orderbook";
import quoteRoutes from "./quote";
import settlementRoutes from "./settlement";
import statsRoutes from "./stats";
import tradeRoutes from "./trade";

const router = Router();

router.use(fundingRoutes);
router.use(guildRoutes);
router.use(instrumentRoutes);
router.use(insuranceRoutes);
router.use(leaderboardRoutes);
router.use(liquidationRoutes);
router.use(orderbookRoutes);
router.use(quoteRoutes);
router.use(settlementRoutes);
router.use(statsRoutes);
router.use(tradeRoutes);

export default router;
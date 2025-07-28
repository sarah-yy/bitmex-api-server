import { Router } from "express";
import fundingRoutes from "./funding";
import instrumentRoutes from "./instrument";
import leaderboardRoutes from "./leaderboard";
import orderbookRoutes from "./orderbook";
import statsRoutes from "./stats";

const router = Router();

router.use(fundingRoutes);
router.use(instrumentRoutes);
router.use(leaderboardRoutes);
router.use(orderbookRoutes);
router.use(statsRoutes);

export default router;
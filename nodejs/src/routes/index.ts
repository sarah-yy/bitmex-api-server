import { Router } from "express";
import instrumentRoutes from "./instrument";
import leaderboardRoutes from "./leaderboard";

const router = Router();

router.use(instrumentRoutes);
router.use(leaderboardRoutes);

export default router;
import Router from "express";
import { PATHS } from "../constants";
import { Leaderboard } from "../controllers";

const router = Router();

router.get(PATHS.Leaderboard.All, Leaderboard.getLeaderboard);

export default router;
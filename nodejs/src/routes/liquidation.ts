import Router from "express";
import { PATHS } from "../constants";
import { Liquidation } from "../controllers";

const router = Router();

router.get(PATHS.Liquidation.All, Liquidation.getLiquidations);

export default router;
import Router from "express";
import { PATHS } from "../constants";
import { Orderbook } from "../controllers";

const router = Router();

router.get(PATHS.Orderbook.L2, Orderbook.getOrderbookL2);

export default router;
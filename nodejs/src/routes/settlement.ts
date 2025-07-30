import Router from "express";
import { PATHS } from "../constants";
import { Settlement } from "../controllers";

const router = Router();

router.get(PATHS.Settlement.History, Settlement.getSettlement);

export default router;
import Router from "express";
import { PATHS } from "../constants";
import { Funding } from "../controllers";

const router = Router();

router.get(PATHS.Funding.All, Funding.getFunding);

export default router;
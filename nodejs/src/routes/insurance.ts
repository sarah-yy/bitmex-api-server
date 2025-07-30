import Router from "express";
import { PATHS } from "../constants";
import { Insurance } from "../controllers";

const router = Router();

router.get(PATHS.Insurance.All, Insurance.getInsurance);

export default router;
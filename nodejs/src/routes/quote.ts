import Router from "express";
import { PATHS } from "../constants";
import { Quote } from "../controllers";

const router = Router();

router.get(PATHS.Quote.All, Quote.getQuotes);
router.get(PATHS.Quote.Bucketed, Quote.getBucketedQuotes);

export default router;
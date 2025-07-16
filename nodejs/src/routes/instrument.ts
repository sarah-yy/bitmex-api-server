import Router from "express";
import { Instrument } from "../controllers";

const router = Router();

router.get("/instrument", Instrument.getInstruments);

export default router;
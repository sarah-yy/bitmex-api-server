import Router from "express";
import { PATHS } from "../constants";
import { Instrument } from "../controllers";

const router = Router();

router.get(PATHS.Instrument.All, Instrument.getInstruments);
router.get(PATHS.Instrument.Active, Instrument.getActiveInstruments);
router.get(PATHS.Instrument.ActiveAndIndices, Instrument.getActiveAndIndices);
router.get(PATHS.Instrument.ActiveIntervals, Instrument.getActiveIntervals);
router.get(PATHS.Instrument.CompositeIndex, Instrument.getCompositeIndex);
router.get(PATHS.Instrument.Indices, Instrument.getIndices);
router.get(PATHS.Instrument.UsdVolume, Instrument.getUsdVolume);

export default router;
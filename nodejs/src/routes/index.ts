import { Router } from "express";
import instrumentRoutes from "./instrument";

const router = Router();

router.use(instrumentRoutes);

export default router;
import Router from "express";
import { PATHS } from "../constants";
import { Guild } from "../controllers";

const router = Router();

router.get(PATHS.Guild.All, Guild.getGuild);

export default router;
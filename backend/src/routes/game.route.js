import { Router } from "express";
import { startGame, negotiate } from "../controllers/game.controller.js";

const gameRouter = Router();

gameRouter.post("/start", startGame);
gameRouter.post("/negotiate", negotiate);

export default gameRouter;
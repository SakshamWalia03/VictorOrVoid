import express from 'express';
import { getLeaderboard, getTopN, getPlayerRank } from '../controllers/leaderboard.controller.js';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', getLeaderboard);
leaderboardRouter.get('/top/:n', getTopN);
leaderboardRouter.get('/rank/:playerName', getPlayerRank);

export default leaderboardRouter;